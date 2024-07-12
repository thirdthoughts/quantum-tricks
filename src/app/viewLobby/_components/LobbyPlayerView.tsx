"use client";

import { type z } from "zod";
import { type playerSchema } from "~/_util/validation";

export default function LobbyPlayerView({
    player,
  }: { player : z.infer<typeof playerSchema>
  }) {
  return (
    <div>{player.playerName}</div>
  );
}
