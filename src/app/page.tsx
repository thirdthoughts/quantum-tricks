"use client";

import { useState } from "react";
import { z } from "zod";
import { maxPlayers, minPlayers } from "~/util/constants";

interface createGameProps {
  dismiss: () => void;
}

const gameSchema = z.object({
  playerCount: z.number().gte(minPlayers).lte(maxPlayers),
  creator: z.string(),
  players: z
    .array(
      z.object({
        playerName: z.string(),
        playerSign: z.string(),
      }),
    )
    .min(1)
    .max(5), //TODO consider making an "or" schema around each player count to make this max always match the game settings
});

const games: z.infer<typeof gameSchema>[] = [
  {
    playerCount: 3,
    creator: "Alice",
    players: [{ playerName: "Alice", playerSign: "Charm" }],
  },
];

const player = "Bob";

function CreateGame({ dismiss }: createGameProps) {
  const [playerCount, setPlayerCount] = useState(4);
  return (
    <div>
      <div className="flex-auto items-center gap-1 text-center">
        <div>New Game</div>
        <div className="h-4"></div>
        <ul className="flex items-center gap-1">
          <li>
            <input
              className="peer sr-only"
              type="radio"
              value="3"
              name="playerCount"
              id="answer_3"
              checked={playerCount === 3}
              onChange={() => setPlayerCount(3)}
            />
            <label
              className="flex cursor-pointer rounded-lg p-5 hover:bg-slate-800
               focus:outline-none peer-checked:border-transparent peer-checked:bg-green-500 peer-checked:ring-2
               peer-checked:ring-green-500"
              htmlFor="answer_3"
            >
              3 Players
            </label>
          </li>
          <li>
            <input
              className="peer sr-only"
              type="radio"
              value="4"
              name="playerCount"
              id="answer_4"
              checked={playerCount === 4}
              onChange={() => setPlayerCount(4)}
            />
            <label
              className="flex cursor-pointer rounded-lg p-5 hover:bg-slate-800
               focus:outline-none peer-checked:border-transparent peer-checked:bg-green-500 peer-checked:ring-2
               peer-checked:ring-green-500"
              htmlFor="answer_4"
            >
              4 Players
            </label>
          </li>
          <li>
            <input
              className="peer sr-only"
              type="radio"
              value="5"
              name="playerCount"
              id="answer_5"
              checked={playerCount === 5}
              onChange={() => setPlayerCount(5)}
            />
            <label
              className="flex cursor-pointer rounded-lg p-5 hover:bg-slate-800
               focus:outline-none peer-checked:border-transparent peer-checked:bg-green-500 peer-checked:ring-2
               peer-checked:ring-green-500"
              htmlFor="answer_5"
            >
              5 Players
            </label>
          </li>
        </ul>
        <div className="h-4"></div>
        <div className="flex gap-1">
          <button
            className="flex flex-grow cursor-pointer select-none items-center justify-center rounded-lg border-2
 bg-green-800 p-1"
            onMouseDown={() => {
              games.push({
                playerCount,
                creator: "Bob",
                players: [{ playerName: "Bob", playerSign: "Charm" }],
              });
              dismiss();
            }}
          >
            Create
          </button>
          <button
            className="float-right flex flex-grow cursor-pointer select-none items-center justify-center rounded-lg
 border-2 bg-red-800 p-1"
            onMouseDown={() => dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function JoinGame(game: z.infer<typeof gameSchema>, player:string) {
  game.players.push({playerName:player, playerSign:"Spin"})
}

function GameLobby({
  game,
}: {
  game: z.infer<typeof gameSchema>;
}) {
  const alreadyIn = game.players.some((e) => e.playerName === "Bob");

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
          onMouseDown={() => JoinGame(game, player)}
        >
          Join
        </div>
      )}
      {alreadyIn && (
        <div className="flex w-1/6 cursor-pointer justify-center rounded-lg bg-red-500 p-1">
          Leave
        </div>
      )}
    </div>
  );
}
4
function GameLobbyList() {
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
      {games.map((g, i) => (
        <GameLobby key={i} game={g}></GameLobby>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [creating, setCreating] = useState(false);
  return (
    <div className="flex flex-col items-center p-1">
      Development in progress
      <div className="h-4"></div>
      {creating && <CreateGame dismiss={() => setCreating(false)}></CreateGame>}
      {!creating && (
        <>
          <button
            className="flex cursor-pointer select-none items-center justify-center rounded-lg border-2
     border-gray-800 bg-green-800 p-1"
            onMouseDown={() => setCreating(true)}
          >
            New Game
          </button>
          <GameLobbyList></GameLobbyList>
        </>
      )}
    </div>
  );
}
