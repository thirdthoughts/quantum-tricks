import "server-only";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { gameLobby } from "./schema";
import { eq, and } from "drizzle-orm";
import { flavors } from "~/_util/constants";
import { revalidatePath } from "next/cache";
import { validPlayer } from "~/_util/validation";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
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
  if (!user?.fullName)
    throw new Error("Invalid User, please log in and try again");

  const { success } = await ratelimit.limit(user.id);
  if (!success) throw new Error("rate limit exceeded");

  await db.insert(gameLobby).values({
    creator: user.fullName,
    creatorId: user.id,
    creatorFlavor: "Charm",
    playerCount,
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

  if (!user?.fullName)
    throw new Error("Invalid User, please log in and try again");

  const { success } = await ratelimit.limit(user.id);
  if (!success) throw new Error("rate limit exceeded");

  return games.map((g) => {
    const playerIds = [
      g.creatorId,
      g.player2Id,
      g.player3Id,
      g.player4Id,
      g.player5Id,
    ].filter((id) => id);

    const players = [
      {
        playerName: g.creator,
        playerFlavor: g.creatorFlavor,
        me: g.creatorId === user?.id,
      },
      {
        playerName: g.player2,
        playerFlavor: g.player2Flavor,
        me: g.player2Id === user?.id,
      },
      {
        playerName: g.player3,
        playerFlavor: g.player3Flavor,
        me: g.player3Id === user?.id,
      },
      {
        playerName: g.player4,
        playerFlavor: g.player4Flavor,
        me: g.player4Id === user?.id,
      },
      {
        playerName: g.player5,
        playerFlavor: g.player5Flavor,
        me: g.player5Id === user?.id,
      },
    ].filter((p) => validPlayer(p));

    const lobby = {
      id: g.id,
      playerCount: g.playerCount,
      creator: g.creator,
      players: players,
      mine: !!user?.id && playerIds.includes(user.id),
    };
    return lobby;
  });
}

export async function getGameLobby(id: number) {
  const g = await db.query.gameLobby.findFirst({
    where: and(eq(gameLobby.started, false), eq(gameLobby.id, id)),
  });
  const user = await currentUser();
  if (!user?.fullName)
    throw new Error("Invalid User, please log in and try again");

  const { success } = await ratelimit.limit(user.id);
  if (!success) throw new Error("rate limit exceeded");

  if (!g) throw new Error("game lobby not found");

  const playerIds = [
    g.creatorId,
    g.player2Id,
    g.player3Id,
    g.player4Id,
    g.player5Id,
  ].filter((id) => id);

  const players = [
    {
      playerName: g.creator,
      playerFlavor: g.creatorFlavor,
      me: g.creatorId === user?.id,
    },
    {
      playerName: g.player2,
      playerFlavor: g.player2Flavor,
      me: g.player2Id === user?.id,
    },
    {
      playerName: g.player3,
      playerFlavor: g.player3Flavor,
      me: g.player3Id === user?.id,
    },
    {
      playerName: g.player4,
      playerFlavor: g.player4Flavor,
      me: g.player4Id === user?.id,
    },
    {
      playerName: g.player5,
      playerFlavor: g.player5Flavor,
      me: g.player5Id === user?.id,
    },
  ].filter((p) => validPlayer(p));

  const lobby = {
    id: g.id,
    playerCount: g.playerCount,
    creator: g.creator,
    players: players,
    mine: !!user?.id && playerIds.includes(user.id),
  };
  return lobby;
}

export async function JoinGame(lobbyId: number) {
  const user = await currentUser();
  if (!user?.fullName)
    throw new Error("Invalid User, please log in and try again");

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
        playerCount: g.playerCount,
        creator: g.creator,
        playerIds: [
          g.creatorId,
          g.player2Id,
          g.player3Id,
          g.player4Id,
          g.player5Id,
        ],
        flavors: [
          g.creatorFlavor,
          g.player2Flavor,
          g.player3Flavor,
          g.player4Flavor,
          g.player5Flavor,
        ],

        players: [
          {
            playerName: g.creator,
            playerFlavor: g.creatorFlavor,
            me: g.creatorId === user?.id,
          },
          {
            playerName: g.player2,
            playerFlavor: g.player2Flavor,
            me: g.player2Id === user?.id,
          },
          {
            playerName: g.player3,
            playerFlavor: g.player3Flavor,
            me: g.player3Id === user?.id,
          },
          {
            playerName: g.player4,
            playerFlavor: g.player4Flavor,
            me: g.player4Id === user?.id,
          },
          {
            playerName: g.player5,
            playerFlavor: g.player5Flavor,
            me: g.player5Id === user?.id,
          },
        ].filter(validPlayer),
      };
    })[0];

    if (!lobby) {
      tx.rollback();
      Err.message = `Error joining game, ${lobbies.length} found with matching ID`;
      return false;
    }

    // if the player is already in the game, abort
    if (lobby.playerIds.some((p) => p === user.id)) {
      tx.rollback();
      Err.message = `Error joining game, you are already in this game`;
      return false;
    }
    // if a player tries to join a game past its playercount, abort
    const numPlayers = lobby.playerIds.filter((n) => n).length || 0;
    if (numPlayers >= lobby.playerCount) {
      tx.rollback();
      Err.message = `Error joining game, no space for you!`;
      return false;
    }
    // join at the earliest empty spot!
    const index = lobby.playerIds.findIndex((e) => !e);
    const flavor = flavors.find((e) => !lobby.flavors.includes(e));
    switch (index) {
      case 1:
        await tx
          .update(gameLobby)
          .set({
            player2Id: user.id,
            player2: user.fullName,
            player2Flavor: flavor,
          })
          .where(eq(gameLobby.id, lobby.id));
        break;
      case 2:
        await tx
          .update(gameLobby)
          .set({
            player3Id: user.id,
            player3: user.fullName,
            player3Flavor: flavor,
          })
          .where(eq(gameLobby.id, lobby.id));
        break;
      case 3:
        await tx
          .update(gameLobby)
          .set({
            player4Id: user.id,
            player4: user.fullName,
            player4Flavor: flavor,
          })
          .where(eq(gameLobby.id, lobby.id));
        break;
      case 4:
        await tx
          .update(gameLobby)
          .set({
            player5Id: user.id,
            player5: user.fullName,
            player5Flavor: flavor,
          })
          .where(eq(gameLobby.id, lobby.id));
        break;
      default:
        tx.rollback();
        Err.message = "No space found due to invalid index";
        return false;
    }
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
  if (!user?.fullName)
    throw new Error("Invalid User, please log in and try again");

  const { success } = await ratelimit.limit(user.id);
  if (!success) throw new Error("rate limit exceeded");

  const Err = new Error();

  const txResult = await db.transaction(async (tx) => {
    const lobbies = await tx
      .select()
      .from(gameLobby)
      .for("update")
      .where(and(eq(gameLobby.id, lobbyId), eq(gameLobby.started, false)));

    const lobby = lobbies.map((gl) => {
      return {
        id: gl.id,
        playerCount: gl.playerCount,
        creator: gl.creator,
        playerIds: [
          gl.creatorId,
          gl.player2Id,
          gl.player3Id,
          gl.player4Id,
          gl.player5Id,
        ],
        flavors: [
          gl.creatorFlavor,
          gl.player2Flavor,
          gl.player3Flavor,
          gl.player4Flavor,
          gl.player5Flavor,
        ],
      };
    })[0];

    if (!lobby) {
      tx.rollback();
      Err.message = `Error leaving game, ${lobbies.length} found with matching ID`;
      return false;
    }

    // if the player is NOT already in the game, abort
    const index = lobby.playerIds.findIndex((e) => e === user.id);
    if (index < 0) {
      tx.rollback();
      Err.message = `Error leaving game, you are not in this game`;
      return false;
    }

    // join at the earliest empty spot!
    switch (index) {
      case 0:
        //this is the case where the creator is leaving
        await tx.delete(gameLobby).where(eq(gameLobby.id, lobby.id));
        break;
      case 1:
        await tx
          .update(gameLobby)
          .set({
            player2Id: null,
            player2: null,
            player2Flavor: null,
          })
          .where(eq(gameLobby.id, lobby.id));
        break;
      case 2:
        await tx
          .update(gameLobby)
          .set({
            player3Id: null,
            player3: null,
            player3Flavor: null,
          })
          .where(eq(gameLobby.id, lobby.id));
        break;
      case 3:
        await tx
          .update(gameLobby)
          .set({
            player4Id: null,
            player4: null,
            player4Flavor: null,
          })
          .where(eq(gameLobby.id, lobby.id));
        break;
      case 4:
        await tx
          .update(gameLobby)
          .set({
            player5Id: null,
            player5: null,
            player5Flavor: null,
          })
          .where(eq(gameLobby.id, lobby.id));
        break;
      default:
        tx.rollback();
        Err.message = "No space found due to invalid index";
        return false;
    }

    return true;
  });
  revalidatePath("/");
  revalidatePath(`/viewLobby/${lobbyId}`);

  if (!txResult) throw Err;
  return txResult;
}
