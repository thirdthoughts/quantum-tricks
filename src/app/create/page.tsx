"use server";

import CreateGame from "~/app/create/_components/CreateGameLobby";

export default async function CreateGameLobby() {
  
  return (

      <div className="w-full flex items-center">
        <CreateGame></CreateGame>
      </div>
  );
}
