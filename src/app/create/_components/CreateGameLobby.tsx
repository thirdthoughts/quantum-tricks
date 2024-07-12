"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { CreateLobby } from "~/server/actions";

export default function CreateGame() {
  const [playerCount, setPlayerCount] = useState(4);
  const router = useRouter()
  return (
    <div className="justify-center gap-1 text-center items-center m-auto">
      <div>New Game</div>
      <div className="h-4"></div>
      <div className="flex items-center">
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
      </div>
      <div className="h-4"></div>
      <div className="flex gap-1">
        <button
          className="flex flex-grow cursor-pointer select-none items-center justify-center rounded-lg border-2
   bg-green-800 p-1"
          onMouseDown={async () => {
            const success = await CreateLobby(playerCount);
            if(success) toast.info(`Game Created`);
            router.push("/");
          }}
        >
          Create
        </button>
        <Link
          className="float-right flex flex-grow cursor-pointer select-none items-center justify-center rounded-lg
   border-2 bg-red-800 p-1"
          href="/"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
