"use server";

import { getMyActiveGames } from "~/server/db/queries";
import GameListView from "./GameListView";

export default async function GameList() {
  const games = await getMyActiveGames();
  return (
    <div className="flex max-w-xl flex-col gap-1">
      <div className="flex flex-row gap-1">
        <div className="flex w-1/12 rounded-tl-lg bg-slate-500 p-1">#P</div>
        <div className="flex w-1/3 bg-slate-500 p-1">Game Name</div>
        <div className="flex w-1/3 bg-slate-500 p-1">Active Player</div>
        <div className="flex w-1/6 justify-center bg-slate-500 p-1">Round #</div>
        <div className="flex w-1/6 justify-center rounded-tr-lg bg-slate-500 p-1">
          View
        </div>
      </div>
      {!!games?.length && games.map((g) => <GameListView key={g.id} game={g}></GameListView>)}
    </div>
  );
}
