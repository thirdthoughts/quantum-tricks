"use server";

import { getGameLobbies } from "~/server/db/queries";
import GameLobbyListView from "./GameLobbyListView";
import { JoinLobby, LeaveLobby } from "~/server/actions";

export async function GameLobbyList() {
  const games = await getGameLobbies();
  return (
    <div className="flex max-w-xl flex-col gap-1">
      <div className="flex flex-row gap-1">
        <div className="flex w-1/12 rounded-tl-lg bg-slate-500 p-1">#P</div>
        <div className="flex w-1/3 bg-slate-500 p-1">Game Name</div>
        <div className="flex w-1/6 bg-slate-500 p-1">Seats</div>
        <div className="flex w-1/6 justify-center bg-slate-500 p-1">
          View
        </div>
        <div className="flex w-1/6 justify-center rounded-tr-lg bg-slate-500 p-1">
          Join
        </div>
      </div>
      {games.map((g) => (
        <GameLobbyListView key={g.id} gameLobby={g} Join={JoinLobby} Leave={LeaveLobby}></GameLobbyListView>
      ))}
      {
        !games?.length && <p>No lobbies available now, create your own!</p>
      }
    </div>
  );
}
