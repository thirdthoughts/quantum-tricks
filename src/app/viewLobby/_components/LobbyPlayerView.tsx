"use client";

export default function LobbyPlayerView({
    player,
  }: { player : {
    playerName: string;
    playerFlavor: string;
  }
  }) {
  return (
    <div>{player.playerName}</div>
  );
}
