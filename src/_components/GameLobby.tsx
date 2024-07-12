"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { z } from "zod";
import { type gameSchema } from "~/_util/validation";
import { JoinLobby, LeaveLobby } from "~/server/actions";

export default function GameLobby({
  gameLobby,
}: {
  gameLobby: z.infer<typeof gameSchema>;
}) {
  const { user, isLoaded } = useUser();
  const mine = gameLobby.creator === user?.fullName;
  const alreadyIn = gameLobby.players.some(
    (p) => p.playerName === user?.fullName,
  );

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
          onMouseDown={() => {
            LeaveLobby(gameLobby.id);
          }}
        >
          Abort
        </div>
      )}
      {!alreadyIn && (
        <div
          className="flex w-1/6 cursor-pointer justify-center rounded-lg bg-green-500 p-1"
          onMouseDown={() => {
            JoinLobby(gameLobby.id);
          }}
        >
          Join
        </div>
      )}
      {alreadyIn && !mine && (
        <div
          className="flex w-1/6 cursor-pointer justify-center rounded-lg bg-red-500 p-1"
          onMouseDown={() => {
            LeaveLobby(gameLobby.id);
          }}
        >
          Leave
        </div>
      )}
    </div>
  );
}
