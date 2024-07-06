"use client";

import { useState } from "react";

const games = [];

interface createGameProps {
  onCancel: () => void;
}

function CreateGame({ onCancel }: createGameProps) {
  return (
    <div>
      TODO create a game
      Select Player Count
      Select your color
      <button
        className="flex cursor-pointer select-none items-center justify-center rounded-lg border-2
border-gray-800 bg-red-800"
        onMouseDown={() => onCancel()}
      >
        Cancel
      </button>
    </div>
  );
}

export default function HomePage() {
  const [creating, setCreating] = useState(false);
  return (
    <div className="">
      Hello, Quantum Tricks in progress
      {creating && (
        <CreateGame onCancel={() => setCreating(false)}></CreateGame>
      )}
      {!creating && (
        <div>
          <button
            className="flex cursor-pointer select-none items-center justify-center rounded-lg border-2
     border-gray-800 bg-green-800"
            onMouseDown={() => setCreating(true)}
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
}
