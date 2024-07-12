"use client";

import { type z } from "zod";
import { type playerSchema } from "~/_util/validation";
import { SVGFilledDot } from "~/app/_svg/filledDot";
import { StrangeFlavorIcon } from "~/app/_svg/strange";

export default function LobbyPlayerView({
    player,
  }: { player : z.infer<typeof playerSchema>
  }) {
  return (
    <div className="flex flex-row gap-1">
        <div className="flex w-1/12 bg-blue-500 p-1">{!!player.me && <SVGFilledDot></SVGFilledDot>}</div>
        <div className="flex w-1/2 bg-blue-500 p-1">{player.playerName}</div>
        <div className="flex w-1/3 bg-blue-500 p-1 items-center">{player.playerFlavor}</div>
      </div>
  );
}
