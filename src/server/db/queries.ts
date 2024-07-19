import "server-only";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { game, gameLobby, type GamePlayer } from "./schema";
import { eq, and } from "drizzle-orm";
import { flavors, PlayerBoard, ResearchBoard } from "~/_util/constants";
import { revalidatePath } from "next/cache";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { dealHands, shuffle } from "~/_util/functions";

// Create a new ratelimiter, that allows 20 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, "10 s"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit/quantum-tricks",
});

export async function createGameLobby(playerCount: number) {
  const user = await currentUser();
  if (!user) throw new Error("Invalid User, please log in and try again");

  const { success } = await ratelimit.limit(user.id);
  if (!success) throw new Error("rate limit exceeded");

  await db.insert(gameLobby).values({
    creatorId: user.id,
    creatorName: user.username ?? user.fullName ?? user.id,
    players: [
      {
        playerFlavor: "Charm",
        playerId: user.id,
        playerName: user.username ?? user.fullName ?? user.id,
      },
    ],
    gameSize: playerCount,
  });

  revalidatePath("/");
  return true;
}

export async function getGameLobbies() {
  const games = await db.query.gameLobby.findMany({
    where: eq(gameLobby.started, false),
    orderBy: gameLobby.id,
  });
  const user = await currentUser();

  if (!user) throw new Error("Invalid User, please log in and try again");

  const { success } = await ratelimit.limit(user.id);
  if (!success) throw new Error("rate limit exceeded");

  return games.map((g) => {
    const players = g.players.map((e) => {
      return {
        playerName: e.playerName,
        playerFlavor: e.playerFlavor,
        me: e.playerId === user.id,
      };
    });

    const alreadyIn = !!players.find((p) => p.me);

    const lobby = {
      id: g.id,
      playerCount: g.gameSize,
      creator: g.creatorName,
      players: players,
      mine: g.creatorId === user.id,
      alreadyIn,
    };
    return lobby;
  });
}

export async function getGameLobby(id: number) {
  const g = await db.query.gameLobby.findFirst({
    where: and(eq(gameLobby.started, false), eq(gameLobby.id, id)),
  });
  const user = await currentUser();
  if (!user) throw new Error("Invalid User, please log in and try again");

  const { success } = await ratelimit.limit(user.id);
  if (!success) throw new Error("rate limit exceeded");

  if (!g) throw new Error("game lobby not found");

  const players = g.players.map((e) => {
    return {
      playerName: e.playerName,
      playerFlavor: e.playerFlavor,
      me: e.playerId === user.id,
    };
  });

  const alreadyIn = !!players.find((p) => p.me);

  const lobby = {
    id: g.id,
    playerCount: g.gameSize,
    creator: g.creatorName,
    players: players,
    mine: g.creatorId === user.id,
    alreadyIn,
  };
  return lobby;
}

export async function JoinGame(
  lobbyId: number,
  flavor?: (typeof flavors)[number],
) {
  const user = await currentUser();
  if (!user) throw new Error("Invalid User, please log in and try again");

  const { success } = await ratelimit.limit(user.id);
  if (!success) throw new Error("rate limit exceeded");

  const Err = new Error();

  const txResult = await db.transaction(async (tx) => {
    const lobbies = await tx
      .select()
      .from(gameLobby)
      .for("update")
      .where(and(eq(gameLobby.id, lobbyId), eq(gameLobby.started, false)));

    const lobby = lobbies.map((g) => {
      return {
        id: g.id,
        playerCount: g.gameSize,
        players: g.players,
      };
    })[0];

    if (!lobby) {
      tx.rollback();
      Err.message = `Error joining game, ${lobbies.length} found with matching ID`;
      return false;
    }

    // if the player is already in the game, abort
    if (lobby.players.some((p) => p.playerId === user.id)) {
      tx.rollback();
      Err.message = `Error joining game, you are already in this game`;
      return false;
    }
    // join with the first available flavor if not specified
    if (!flavor) {
      flavor =
        flavors.find(
          (e) => !lobby.players.map((p) => p.playerFlavor).includes(e),
        ) ?? "Up";
    }
    //if flavor already claimed, abort
    if (lobby.players.some((p) => p.playerFlavor === flavor)) {
      tx.rollback();
      Err.message = `Error joining game, this flavor is already claimed`;
      return false;
    }
    // if a player tries to join a game past its playercount, abort
    const numPlayers = lobby.players.length;
    if (numPlayers >= lobby.playerCount) {
      tx.rollback();
      Err.message = `Error joining game, no space for you!`;
      return false;
    }
    const players = lobby.players;
    players.push({
      playerFlavor: flavor,
      playerId: user.id,
      playerName: user.username ?? user.fullName ?? user.id,
    });

    await tx
      .update(gameLobby)
      .set({ players })
      .where(eq(gameLobby.id, lobby.id));

    // TODO if game is now full, start the game
    if (numPlayers + 1 == lobby.playerCount) {
    }
    return true;
  });
  revalidatePath("/");
  revalidatePath(`/viewLobby/${lobbyId}`);

  if (!txResult) throw Err;
  return txResult;
}

export async function LeaveGame(lobbyId: number) {
  const user = await currentUser();
  if (!user) throw new Error("Invalid User, please log in and try again");

  const { success } = await ratelimit.limit(user.id);
  if (!success) throw new Error("rate limit exceeded");

  const Err = new Error();

  const txResult = await db.transaction(async (tx) => {
    const lobbies = await tx
      .select()
      .from(gameLobby)
      .for("update")
      .where(and(eq(gameLobby.id, lobbyId), eq(gameLobby.started, false)));

    const lobby = lobbies.map((g) => {
      return {
        id: g.id,
        playerCount: g.gameSize,
        players: g.players,
        creatorId: g.creatorId,
      };
    })[0];

    if (!lobby) {
      tx.rollback();
      Err.message = `Error leaving game, ${lobbies.length} found with matching ID`;
      return false;
    }

    // if the player is NOT already in the game, abort
    const index = lobby.players.findIndex((e) => e.playerId === user.id);
    if (index < 0) {
      tx.rollback();
      Err.message = `Error leaving game, you are not in this game`;
      return false;
    }

    // if I am the creator, abort, otherwise leave

    const filteredPlayers = lobby.players.filter((p) => p.playerId !== user.id);

    if (user.id === lobby.creatorId) {
      await tx.delete(gameLobby).where(eq(gameLobby.id, lobby.id));
    } else {
      await tx
        .update(gameLobby)
        .set({ players: filteredPlayers })
        .where(eq(gameLobby.id, lobby.id));
    }

    return true;
  });
  revalidatePath("/");
  revalidatePath(`/viewLobby/${lobbyId}`);

  if (!txResult) throw Err;
  return txResult;
}

export async function StartGameQuery(lobbyId: number) {
  const Err = new Error();
  const txResult = await db.transaction(async (tx) => {
    //look up the lobby
    const lobbies = await tx
      .select()
      .from(gameLobby)
      .for("update")
      .where(and(eq(gameLobby.id, lobbyId), eq(gameLobby.started, false)));

    const lobby = lobbies[0];
    if (!lobby) {
      Err.message = `Error starting game, no unstarted lobby found with matching ID`;
      tx.rollback();
      return false;
    }

    //if it is not full or it is overfull, abort
    if (lobby.players.length !== lobby.gameSize) {
      Err.message = `Error starting game, expected ${lobby.gameSize} players, found ${lobby.players.length}`;
      tx.rollback();
      return false;
    }

    //if any player is somehow duplicated, abort
    if (
      [...new Set(lobby.players.map((p) => p.playerId))].length !==
      lobby.players.length
    ) {
      Err.message = `Error starting game, found duplicate player id`;
      tx.rollback();
      return false;
    }
    //if any flavor is somehow duplicated, abort
    if (
      [...new Set(lobby.players.map((p) => p.playerFlavor))].length !==
      lobby.players.length
    ) {
      Err.message = `Error starting game, found duplicate flavor`;
      tx.rollback();
      return false;
    }

    //now create the game
    //assign a board to each player (appropriate side for game size)
    //set up score board with player names and round numbers (leave blank until rounds complete)
    //to set up for round 1, deal a hand of cards based on the game size to each player
    const hands = dealHands(lobby.gameSize);
    const gamePlayers: GamePlayer[] = lobby.players.map((p, i) => {
      return {
        playerBoard: PlayerBoard(lobby.gameSize),
        roundScores: Array(lobby.gameSize).map(() => 0),
        roundBids: Array(lobby.gameSize).map(() => 0),
        currentHand: hands[i],
        ...p,
      };
    });
    //determine player order (random by default)
    const shuffledPlayers = shuffle(gamePlayers);
    //set up research board based on player count (including any observed markers needed)
    const researchBoard = ResearchBoard(lobby.gameSize);

    //save state as a new game
    await tx.insert(game).values({
      players: shuffledPlayers,
      researchBoard: researchBoard,
      currentPlayerIndex: 0,
      currentRoundStartPlayerIndex: 0,
      currentRoundLeadColor: null,
      currentRound: 1,
    });

    await tx
      .update(gameLobby)
      .set({
        started: true,
      })
      .where(eq(gameLobby.id, lobbyId));

      return true;
  });

  if (!txResult) throw Err;
  return txResult;
}
