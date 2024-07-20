"use server";

import Link from "next/link";
import GameList from "~/_components/GameList";
import { GameLobbyList } from "~/_components/GameLobbyList";

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center p-1">
        <div className="w-full p-4">
          <Link className="flex cursor-pointer select-none items-center justify-center rounded-lg border-2 w-24
     border-gray-800 bg-green-800 p-1" href="/create">New Game</Link>
            

          <div className="h-4"></div>
          <GameLobbyList></GameLobbyList>
          <div className="h-4"></div>
          <GameList></GameList>
        </div>
    </div>
  );
}
