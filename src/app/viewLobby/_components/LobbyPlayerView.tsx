"use client";

import { z } from "zod";
import { playerSchema } from "~/_util/validation";

export default function LobbyPlayerView({
    player,
  }: { player : z.infer<typeof playerSchema>
  }) {
  return (
    <div>{player.playerName}</div>
  );
}
