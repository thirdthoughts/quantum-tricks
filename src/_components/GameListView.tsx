"use client";

import { type PromiseResolvedType } from "~/_util/validation";
import { type getMyActiveGames } from "~/server/db/queries";

export default function GameListView({
  game,
}: {
  game: PromiseResolvedType<ReturnType<typeof getMyActiveGames>>[number];
}) {
  return (
    <div className="flex max-w-xl flex-col gap-1">
      <div className="flex flex-row gap-1">
        <div className="flex w-1/12 bg-blue-500 p-1">{game.gameSize}</div>
        <div className="flex w-1/3 bg-blue-500 p-1">{game.gameName}</div>
        <div className="flex w-1/3 bg-blue-500 p-1">{game.currentPlayerIndex}</div>
        <div className="flex w-1/6 justify-center bg-blue-500 p-1">
          {game.currentRound}
        </div>
        <div className="flex w-1/6 justify-center bg-blue-500 p-1">
          View
        </div>
      </div>
    </div>
  );
}
