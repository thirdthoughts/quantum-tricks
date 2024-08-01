"use client"

import { Button } from "~/_components/ui/button";

export default function StartGameButton ({lobbyId, Start} : {lobbyId:number; Start: (lobbyId: number) => void}) {
    return (<Button variant={"do"}
        className=" flex w-24 cursor-pointer select-none items-center justify-center rounded-lg border-2
     border-gray-800 bg-green-800 p-1"
        onMouseDown={(eventData) => {
          if (eventData.button === 0) Start(lobbyId);
        }}>Start</Button>)
} 