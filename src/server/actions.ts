"use server"

import { type flavors } from "~/_util/constants";
import { createGameLobby, JoinGame, LeaveGame } from "./db/queries"

export async function JoinLobby(gameNumber: number, flavor?: typeof flavors[number]) {
    await JoinGame(gameNumber, flavor);
}

export async function LeaveLobby(gameNumber: number) {
    await LeaveGame(gameNumber);
}

export async function CreateLobby(playerCount: number) {
    return await createGameLobby(playerCount);
}