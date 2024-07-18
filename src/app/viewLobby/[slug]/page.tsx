"use server";

import { getGameLobby } from "~/server/db/queries";
import LobbyPlayerView from "../_components/LobbyPlayerView";
import LobbyEmptyPlayerView from "../_components/LobbyEmptyPlayerView";
import { JoinLobby, LeaveLobby } from "~/server/actions";

// export async function generateStaticParams() {
//   const gameLobbies = await getGameLobbies();
//   return gameLobbies.map((gl) => {
//     slug: gl.id;
//   });
// }

export default async function ViewLobby({
  params,
}: {
  params: { slug: number };
}) {
  const gameLobby = await getGameLobby(params.slug);
  return (
    <div className="flex max-w-lg flex-col gap-1">
      <div className="flex flex-row gap-1">
        <div className="flex w-1/12 rounded-tl-lg bg-slate-500 p-1"></div>
        <div className="flex w-1/2 bg-slate-500 p-1">Player</div>
        <div className="flex w-1/6 bg-slate-500 p-1">Flavor</div>
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
      {Array.from({
        length: gameLobby.playerCount - gameLobby.players.length,
      }).map((it, index) => {
        return (
          <LobbyEmptyPlayerView
            key={`emptySlot${index}`}
            Join={JoinLobby}
            params={params}
            alreadyIn={gameLobby.alreadyIn}
          ></LobbyEmptyPlayerView>
        );
      })}
    </div>
    //TODO show players, flavors, and empty seats
    //TODO if player already in game, allow changing flavor
    //TODO assign each flavor a color
    //TODO if player not in game, allow player to join
  );
}
