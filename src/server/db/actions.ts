"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { gameLobby } from "./schema";
import { eq, and } from "drizzle-orm";
import { flavors } from "~/util/constants";
import { revalidatePath } from "next/cache";

export async function createGameLobby(playerCount: number) {
  const user = await currentUser();
  if (!user?.fullName)
    throw new Error("Invalid User, please log in and try again");

  await db.insert(gameLobby).values({
    creator: user.fullName,
    creatorId: user.id,
    creatorFlavor: "Charm",
    playerCount,
  });
  revalidatePath("/");
}

export async function getGameLobbies() {
  const games = await db.query.gameLobby.findMany({
    where: eq(gameLobby.started, false),
  });

  return games.map((g) => {
    const game = {
      id: g.id,
      playerCount: g.playerCount,
      creator: g.creator,
      players: [{ playerName: g.creator, playerFlavor: g.creatorFlavor }],
    };
    if (g.player2 && g.player2Flavor)
      game.players.push({
        playerName: g.player2,
        playerFlavor: g.player2Flavor,
      });
    if (g.player3 && g.player3Flavor)
      game.players.push({
        playerName: g.player3,
        playerFlavor: g.player3Flavor,
      });
    if (g.player4 && g.player4Flavor)
      game.players.push({
        playerName: g.player4,
        playerFlavor: g.player4Flavor,
      });
    if (g.player5 && g.player5Flavor)
      game.players.push({
        playerName: g.player5,
        playerFlavor: g.player5Flavor,
      });
    return game;
  });
}

export async function JoinGame(gameId: number) {
  const user = await currentUser();
  if (!user?.fullName)
    throw new Error("Invalid User, please log in and try again");

  const Err = new Error();

  const txResult = await db.transaction(async (tx) => {
    const games = await tx
      .select()
      .from(gameLobby)
      .for("update")
      .where(and(eq(gameLobby.id, gameId), eq(gameLobby.started, false)));

    const game = games.map((g) => {
      const game = {
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
      };
      return game;
    })[0];

    if (!game) {
      tx.rollback();
      Err.message = `Error joining game, ${games.length} found with matching ID`;
      return false;
    }

    // if the player is already in the game, abort
    if (game.playerIds.some((p) => p === user.id)) {
      tx.rollback();
      Err.message = `Error joining game, you are already in this game`;
      return false;
    }
    // if a player tries to join a game past its playercount, abort
    const numPlayers = game.playerIds.filter((n) => n).length || 0;
    if (numPlayers >= game.playerCount) {
      tx.rollback();
      Err.message = `Error joining game, no space for you!`;
      return false;
    }
    // join at the earliest empty spot!
    const index = game.playerIds.findIndex((e) => !e);
    const flavor = flavors.find((e) => !game.flavors.includes(e));
    switch (index) {
      case 1:
        await tx
          .update(gameLobby)
          .set({
            player2Id: user.id,
            player2: user.fullName,
            player2Flavor: flavor,
          }).where(eq(gameLobby.id, game.id));
        break;
      case 2:
        await tx
          .update(gameLobby)
          .set({
            player3Id: user.id,
            player3: user.fullName,
            player3Flavor: flavor,
          }).where(eq(gameLobby.id, game.id));;
        break;
      case 3:
        await tx
          .update(gameLobby)
          .set({
            player4Id: user.id,
            player4: user.fullName,
            player4Flavor: flavor,
          }).where(eq(gameLobby.id, game.id));;
        break;
      case 4:
        await tx
          .update(gameLobby)
          .set({
            player5Id: user.id,
            player5: user.fullName,
            player5Flavor: flavor,
          }).where(eq(gameLobby.id, game.id));;
        break;
      default:
        tx.rollback();
        Err.message = "No space found due to invalid index";
        return false;
    }
    // TODO if game is now full, start the game
    return true;
  });

  if (!txResult) throw Err;
  revalidatePath("/");
  return txResult;
}

export async function LeaveGame(gameId: number) {
    const user = await currentUser();
    if (!user?.fullName)
      throw new Error("Invalid User, please log in and try again");
  
    const Err = new Error();
  
    const txResult = await db.transaction(async (tx) => {
      const games = await tx
        .select()
        .from(gameLobby)
        .for("update")
        .where(and(eq(gameLobby.id, gameId), eq(gameLobby.started, false)));
  
      const game = games.map((g) => {
        const game = {
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
        };
        return game;
      })[0];
  
      if (!game) {
        tx.rollback();
        Err.message = `Error leaving game, ${games.length} found with matching ID`;
        return false;
      }
  
      // if the player is NOT already in the game, abort
      const index = game.playerIds.findIndex((e)=> e === user.id)
      if (index <0) {
        tx.rollback();
        Err.message = `Error leaving game, you are not in this game`;
        return false;
      }
      
      // join at the earliest empty spot!
      switch (index) {
        case 0:
            //this is the case where the creator is leaving
            await tx.delete(gameLobby).where(eq(gameLobby.id, game.id))
            break;
        case 1:
          await tx
            .update(gameLobby)
            .set({
              player2Id: null,
              player2: null,
              player2Flavor: null,
            }).where(eq(gameLobby.id, game.id));
          break;
        case 2:
          await tx
            .update(gameLobby)
            .set({
              player3Id: null,
              player3: null,
              player3Flavor: null,
            }).where(eq(gameLobby.id, game.id));;
          break;
        case 3:
          await tx
            .update(gameLobby)
            .set({
              player4Id: null,
              player4: null,
              player4Flavor: null,
            }).where(eq(gameLobby.id, game.id));;
          break;
        case 4:
          await tx
            .update(gameLobby)
            .set({
              player5Id: null,
              player5: null,
              player5Flavor: null,
            }).where(eq(gameLobby.id, game.id));;
          break;
        default:
          tx.rollback();
          Err.message = "No space found due to invalid index";
          return false;
      }

      return true;
    });
  
    if (!txResult) throw Err;
    revalidatePath("/");
    return txResult;
  }