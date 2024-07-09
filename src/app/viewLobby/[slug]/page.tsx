"use server";

import { getGameLobbies, getGameLobby } from "~/server/db/actions";
import LobbyPlayerView from "../_components/LobbyPlayerView";

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
    <div className="flex w-1/3 flex-col gap-1">
      <div className="flex flex-row gap-1">
        <div className="flex w-1/12 rounded-tl-lg bg-slate-500 p-1"></div>
        <div className="flex w-1/2 bg-slate-500 p-1">Player</div>
        <div className="flex w-1/3 rounded-tr-lg bg-slate-500 p-1">Flavor</div>
      </div>
      {gameLobby.players.map((gl) => <LobbyPlayerView player={gl}></LobbyPlayerView>)}
    </div>
    //TODO show players, flavors, and empty seats
    //TODO if player already in game, allow changing flavor
    //TODO if player not in game, allow player to join
  );
}
