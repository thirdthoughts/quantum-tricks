"use server";

import { getGameLobby } from "~/server/db/queries";
import LobbyPlayer from "../_components/LobbyPlayer";
import LobbyJoiner from "../_components/LobbyJoiner";
import { JoinLobby, LeaveLobby, StartGame } from "~/server/actions";
import { flavors } from "~/_util/constants";
import Link from "next/link";
import StartGameButton from "../_components/StartGameButton";

export default async function LobbyPage({
  params,
}: {
  params: { slug: number };
}) {
  const gameLobby = await getGameLobby(params.slug);
  const usedFlavors = gameLobby.players.map((p) => p.playerFlavor);
  const availableFlavors = flavors.filter((f) => !usedFlavors.includes(f));
  return (
    <>
      <div className="flex gap-2">
        <Link
          className="flex w-24 cursor-pointer select-none items-center justify-center rounded-lg border-2
     border-gray-800 bg-green-800 p-1"
          href="/"
        >
          Home
        </Link>
        {gameLobby.mine &&
          gameLobby.playerCount === gameLobby.players.length && (
            <StartGameButton
              lobbyId={gameLobby.id}
              Start={StartGame}
            ></StartGameButton>
          )}
      </div>
      <div className="h-4"></div>
      <div className="flex max-w-xl flex-col gap-1">
        <div className="flex flex-row gap-1">
          <div className="flex w-1/12 rounded-tl-lg bg-slate-500 p-1"></div>
          <div className="flex w-1/2 bg-slate-500 p-1">Player</div>
          <div className="flex w-1/3 bg-slate-500 p-1">Flavor</div>
          <div className="flex w-1/6 rounded-tr-lg bg-slate-500 p-1">
            Action
          </div>
        </div>
        {gameLobby.players.map((p) => (
          <LobbyPlayer
            player={p}
            key={`${p.playerFlavor}_player`}
            myGame={gameLobby.mine}
            Leave={LeaveLobby}
            params={params}
          ></LobbyPlayer>
        ))}
        {gameLobby.playerCount - gameLobby.players.length > 0 && (
          <LobbyJoiner
            Join={JoinLobby}
            params={params}
            alreadyIn={gameLobby.alreadyIn}
            availableFlavors={availableFlavors}
          ></LobbyJoiner>
        )}
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
    </>
    //TODO if player already in lobby, allow changing flavor
  );
}
