"use server"

import { currentUser } from "@clerk/nextjs/server"
import { db } from "~/server/db";
import { gameLobby } from "./schema";
import { eq } from "drizzle-orm";

export async function createGameLobby(playerCount:number) {
    const user = await currentUser();
    if(!user?.fullName) throw new Error("Invalid User, please log in and try again");

    await db.insert(gameLobby).values({creator: user.fullName, creatorId:user.id, creatorFlavor:"Charm", playerCount})
}

export async function getGameLobbies() {
    return db.query.gameLobby.findMany({where: eq(gameLobby.started, false)})
}