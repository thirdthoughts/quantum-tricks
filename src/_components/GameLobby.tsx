"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { z } from "zod";
import { JoinGame, LeaveGame } from "~/server/db/actions";
import { maxPlayers, minPlayers } from "~/util/constants";
const gameSchema = z.object({
  id: z.number(),
  playerCount: z.number().gte(minPlayers).lte(maxPlayers),
  creator: z.string(),
  players: z
    .array(
      z.object({
        playerName: z.string(),
        playerFlavor: z.string(),
      }),
    )
    .min(1)
    .max(5), //TODO consider making an "or" schema around each player count to make this max always match the game settings
});

export default function GameLobby({
  gameLobby,
}: {
  gameLobby: z.infer<typeof gameSchema>;
}) {
  const { user, isLoaded } = useUser();
  const mine = gameLobby.creator === user?.fullName;
  const alreadyIn = gameLobby.players.some((p) => p.playerName === user?.fullName);

  if (!isLoaded) return null;

  return (
    <div className="flex flex-row gap-1">
      <div className="flex w-1/12 bg-blue-700 p-1">{gameLobby.playerCount}</div>
      <div className="flex w-1/2 bg-blue-700 p-1">{gameLobby.creator}</div>
      <div className="flex w-1/4 bg-blue-700 p-1">
        {gameLobby.playerCount - gameLobby.players.length}
      </div>
      <Link
          className="flex w-1/6 cursor-pointer justify-center rounded-lg bg-orange-500 p-1"
          href={`/viewLobby/${gameLobby.id}`}
        >
          View
        </Link>
      {mine && (
        <div
          className="flex w-1/6 cursor-pointer justify-center rounded-lg bg-red-500 p-1"
          onMouseDown={() => LeaveGame(gameLobby.id)}
        >
          Abort
        </div>
      )}
      {!alreadyIn && (
        <div
          className="flex w-1/6 cursor-pointer justify-center rounded-lg bg-green-500 p-1"
          onMouseDown={() => JoinGame(gameLobby.id)}
        >
          Join
        </div>
      )}
      {alreadyIn && !mine && (
        <div
          className="flex w-1/6 cursor-pointer justify-center rounded-lg bg-red-500 p-1"
          onMouseDown={() => LeaveGame(gameLobby.id)}
        >
          Leave
        </div>
      )}
    </div>
  );
}
