"use client";

import { useState } from "react";

const games = [];

export default function HomePage() {
  const [creating, setCreating] = useState(false);
  return (
    <div className="">
      Hello, Quantum Tricks in progress
      {creating && (
        <div>
          TODO create a game{" "}
          <button
            className="bg-white/10 font-semibold transition hover:bg-white/20"
            onMouseDown={() => setCreating(false)}
          >
            Cancel
          </button>
        </div>
      )}
      {!creating && (
        <div>
          <button
            className="bg-white/10 font-semibold transition hover:bg-white/20"
            onMouseDown={() => setCreating(true)}
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
}
