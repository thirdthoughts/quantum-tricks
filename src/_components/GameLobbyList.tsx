"use server";

import { getGameLobbies } from "~/server/db/queries";
import GameLobby from "./GameLobby";
import { JoinLobby, LeaveLobby } from "~/server/actions";

export async function GameLobbyList() {
  const games = await getGameLobbies();
  return (
    <div className="flex w-1/3 flex-col gap-1">
      <div className="flex flex-row gap-1">
        <div className="flex w-1/12 rounded-tl-lg bg-slate-500 p-1">#P</div>
        <div className="flex w-1/2 bg-slate-500 p-1">Creator</div>
        <div className="flex w-1/6 bg-slate-500 p-1">Seats</div>
        <div className="flex w-1/6 justify-center bg-slate-500 p-1">
          View
        </div>
        <div className="flex w-1/6 justify-center rounded-tr-lg bg-slate-500 p-1">
          Join
        </div>
      </div>
      {games.map((g) => (
        <GameLobby key={g.id} gameLobby={g} Join={JoinLobby} Leave={LeaveLobby}></GameLobby>
      ))}
    </div>
  );
}
