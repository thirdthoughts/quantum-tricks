"use client";

import { useState } from "react";

const games = [];

interface createGameProps {
  dismiss: () => void;
}

function CreateGame({ dismiss }: createGameProps) {
  const [playerCount, setPlayerCount] = useState(4);
  return (
    <div>
      <div className="flex-auto items-center text-center gap-1">
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
            className="flex-grow flex cursor-pointer select-none items-center justify-center rounded-lg border-2
 bg-green-800 p-1"
 onMouseDown={()=> {games.push({playerCount, creator:"Bob"}); dismiss()}}
          >
            Create
          </button>
          <button
            className="flex flex-grow cursor-pointer select-none items-center justify-center rounded-lg border-2
 bg-red-800 p-1 float-right"
            onMouseDown={() => dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [creating, setCreating] = useState(false);
  return (
    <div className="flex flex-col items-center p-1">
      Development in progress
      <div className="h-4"></div>
      {creating && (
        <CreateGame dismiss={() => setCreating(false)}></CreateGame>
      )}
      {!creating && (
        <div>
          <button
            className="flex cursor-pointer select-none items-center justify-center rounded-lg border-2
     border-gray-800 bg-green-800 p-1"
            onMouseDown={() => setCreating(true)}
          >
            New Game
          </button>
          {games.map((g)=> <div>{g.playerCount}-player game created by {g.creator}</div>)}
        </div>
      )}
    </div>
  );
}
