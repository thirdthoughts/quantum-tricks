"use client";

import Link from "next/link";
import { type z } from "zod";
import { type gameSchema } from "~/_util/validation";
import { Button } from "~/_components/ui/button";

export default function GameLobby({
  gameLobby,
  Join,
  Leave,
}: {
  gameLobby: z.infer<typeof gameSchema>;
  Join: (gameId: number) => void;
  Leave: (gameId: number) => void;
}) {
  const mine = gameLobby.mine;
  const alreadyIn = gameLobby.alreadyIn;

  return (
    <div className="flex flex-row gap-1">
      <div className="flex w-1/12 bg-blue-700 p-1">{gameLobby.playerCount}</div>
      <div className="flex w-1/3 bg-blue-700 p-1">{gameLobby.creator}</div>
      <div className="flex w-1/6 bg-blue-700 p-1">
        {gameLobby.playerCount - gameLobby.players.length}
      </div>
      <div className="flex w-1/6">
        <Link
          className="w-full cursor-pointer justify-center rounded-lg bg-orange-500 p-1 hover:bg-orange-500/80"
          href={`/viewLobby/${gameLobby.id}`}
        >
          View
        </Link>
      </div>
      <div className="flex w-1/6">
        {mine && (
          <Button
            variant={"destructive"}
            className="w-full"
            onMouseDown={(eventData) => {
              if (eventData.button === 0) Leave(gameLobby.id);
            }}
          >
            Cancel
          </Button>
        )}
        {!alreadyIn && (
          <Button
            variant={"do"}
            className=" w-full"
            onMouseDown={(eventData) => {
              if (eventData.button === 0) Join(gameLobby.id);
            }}
          >
            Join
          </Button>
        )}
        {alreadyIn && !mine && (
          <Button
            variant={"destructive"}
            className=" w-full"
            onMouseDown={(eventData) => {
              if (eventData.button === 0) Leave(gameLobby.id);
            }}
          >
            Leave
          </Button>
        )}
      </div>
    </div>
  );
}
