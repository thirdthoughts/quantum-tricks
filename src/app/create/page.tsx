"use server";

import CreateGame from "~/_components/CreateGameLobby";

export default async function CreateGameLobby() {
  
  return (

      <div className="w-full flex items-center">
        <CreateGame></CreateGame>
      </div>
  );
}
