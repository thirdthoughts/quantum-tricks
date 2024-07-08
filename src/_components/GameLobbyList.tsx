"use server";

import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { getGameLobbies } from "~/server/db/actions";
import { maxPlayers, minPlayers } from "~/util/constants";

const gameSchema = z.object({
  id: z.number(),
  playerCount: z.number().gte(minPlayers).lte(maxPlayers),
  creator: z.string(),
  players: z
    .array(
      z.object({
        playerName: z.string(),
        playerFlavor: z.string(),
      }),
    )
    .min(1)
    .max(5), //TODO consider making an "or" schema around each player count to make this max always match the game settings
});

export async function GameLobbyList() {
  const games = await getGameLobbies();
  return (
    <div className="flex w-1/3 flex-col gap-1">
      <div className="flex flex-row gap-1">
        <div className="flex w-1/12 rounded-tl-lg bg-slate-500 p-1">#P</div>
        <div className="flex w-1/2 bg-slate-500 p-1">Creator</div>
        <div className="flex w-1/4 bg-slate-500 p-1">Open Seats</div>
        <div className="flex w-1/6 justify-center rounded-tr-lg bg-slate-500 p-1">
          Join
        </div>
      </div>
      {games.map((g) => (
        <GameLobby key={g.id} game={g}></GameLobby>
      ))}
    </div>
  );
}

async function GameLobby({ game }: { game: z.infer<typeof gameSchema> }) {
  const user = await currentUser()
  const alreadyIn = game.players.some((p)=>p.playerName===user?.fullName);

  return (
    <div className="flex flex-row gap-1">
      <div className="flex w-1/12 bg-blue-700 p-1">{game.playerCount}</div>
      <div className="flex w-1/2 bg-blue-700 p-1">{game.creator}</div>
      <div className="flex w-1/4 bg-blue-700 p-1">
        {game.playerCount - game.players.length}
      </div>
      {!alreadyIn && (
        <div
          className="flex w-1/6 cursor-pointer justify-center rounded-lg bg-green-500 p-1"
          //onMouseDown={() => JoinGame(game, "Bob")} TODO join a game, if the game is full it immediately begins
        >
          Join
        </div>
      )}
      {alreadyIn && (
        <div className="flex w-1/6 cursor-pointer justify-center rounded-lg bg-red-500 p-1"
        //onMouseDown={() => JoinGame(game, "Bob")} TODO leave a game; if the creator leaves the game is disbanded
        >
          Leave
        </div>
      )}
    </div>
  );
}
