"use server"

import { type flavors } from "~/_util/constants";
import { createGameLobby, JoinGame, LeaveGame, StartGameQuery } from "./db/queries"

export async function JoinLobby(gameNumber: number, flavor?: typeof flavors[number]) {
    await JoinGame(gameNumber, flavor);
}

export async function LeaveLobby(gameNumber: number) {
    await LeaveGame(gameNumber);
}

export async function CreateLobby(playerCount: number, gameName: string) {
    return await createGameLobby(playerCount, gameName);
}

export async function StartGame(lobbyId: number) {
    return await StartGameQuery(lobbyId)
}