"use server"

import { createGameLobby, JoinGame, LeaveGame } from "./db/queries"

export async function JoinLobby(gameNumber: number) {
    await JoinGame(gameNumber);
}

export async function LeaveLobby(gameNumber: number) {
    await LeaveGame(gameNumber);
}

export async function CreateLobby(playerCount: number) {
    return await createGameLobby(playerCount);
}