"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { type z } from "zod";
import { type gameSchema } from "~/_util/validation";
import { Button } from "~/components/ui/button";

export default function GameLobby({
  gameLobby,
  Join,
  Leave
}: {
  gameLobby: z.infer<typeof gameSchema>;
  Join: (gameId: number) => void;
  Leave: (gameId: number) => void;
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
        className="flex w-1/6 cursor-pointer justify-center rounded-lg bg-orange-500 p-1 hover:bg-orange-500/90"
        href={`/viewLobby/${gameLobby.id}`}
      >
        View
      </Link>
      {mine && (
        <Button variant={"destructive"}
          className="flex w-1/6"
          onMouseDown={() => {
            Leave(gameLobby.id);
          }}
        >
          Cancel
        </Button>
      )}
      {!alreadyIn && (
        <Button
          className="flex w-1/6"
          onMouseDown={() => {
            Join(gameLobby.id);
          }}
        >
          Join
        </Button>
      )}
      {alreadyIn && !mine && (
        <Button variant={"destructive"}
          className="flex w-1/6"
          onMouseDown={() => {
            Leave(gameLobby.id);
          }}
        >
          Leave
        </Button>
      )}
    </div>
  );
}
