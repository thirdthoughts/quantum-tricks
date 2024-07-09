"use server"

import { getGameLobbies, getGameLobby } from "~/server/db/actions"

export async function generateStaticParams() {
    const gameLobbies = await getGameLobbies();
    return gameLobbies.map((gl) => {slug: gl.id})
}

export default async function ViewLobby({ params }: {params: {slug: number}}) {
    const gameLobby = await getGameLobby(params.slug)
    return (
        <div>{`Welcome to game ${gameLobby.id}`}</div>
        //TODO show players, flavors, and empty seats
        //TODO if player already in game, allow changing flavor
        //TODO if player not in game, allow player to join
    )
}