"use server";

import { getGameLobby } from "~/server/db/queries";
import LobbyPlayerView from "../_components/LobbyPlayerView";
import LobbyEmptyPlayerView from "../_components/LobbyEmptyPlayerView";
import { JoinLobby, LeaveLobby } from "~/server/actions";
import { flavors } from "~/_util/constants";

export default async function ViewLobby({
  params,
}: {
  params: { slug: number };
}) {
  const gameLobby = await getGameLobby(params.slug);
  const usedFlavors = gameLobby.players.map((p) => p.playerFlavor);
  const availableFlavors = flavors.filter((f) => !usedFlavors.includes(f));
  return (
    <div className="flex max-w-lg flex-col gap-1">
      <div className="flex flex-row gap-1">
        <div className="flex w-1/12 rounded-tl-lg bg-slate-500 p-1"></div>
        <div className="flex w-1/2 bg-slate-500 p-1">Player</div>
        <div className="flex w-1/3 bg-slate-500 p-1">Flavor</div>
        <div className="flex w-1/6 rounded-tr-lg bg-slate-500 p-1">Action</div>
      </div>
      {gameLobby.players.map((p) => (
        <LobbyPlayerView
          player={p}
          key={`${p.playerFlavor}_player`}
          myGame={gameLobby.mine}
          Leave={LeaveLobby}
          params={params}
        ></LobbyPlayerView>
      ))}
      <LobbyEmptyPlayerView
        Join={JoinLobby}
        params={params}
        alreadyIn={gameLobby.alreadyIn}
        availableFlavors={availableFlavors}
      ></LobbyEmptyPlayerView>
      {Array.from({
        length: gameLobby.playerCount - gameLobby.players.length - 1,
      }).map((it, index) => {
        return (
          <div className="flex flex-row gap-1" key={index}>
            <div className="flex w-1/12 bg-slate-400 p-1"></div>
            <div className="flex w-1/2 bg-slate-400 p-1">Open</div>
            <div className="flex w-1/3 bg-slate-400 p-1"></div>
            <div className="flex w-1/6 bg-slate-400 p-1"></div>
          </div>
        );
      })}
    </div>
    //TODO if player already in game, allow changing flavor
    //TODO assign each flavor a color
    //TODO if player not in game, allow player to join
  );
}
