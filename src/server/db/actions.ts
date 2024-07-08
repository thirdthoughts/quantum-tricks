"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { gameLobby } from "./schema";
import { eq } from "drizzle-orm";

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
