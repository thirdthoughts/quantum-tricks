"use client";

import { type z } from "zod";
import { type playerSchema } from "~/_util/validation";
import { SVGFilledDot } from "~/_svg/filledDot";
import { FlavorIcon } from "~/_svg/flavorIcons";
import { Button } from "~/_components/ui/button";
import { useRouter } from "next/navigation";

export default function LobbyPlayer({
  player,
  myGame,
  Leave,
  params,
}: {
  player: z.infer<typeof playerSchema>;
  myGame: boolean;
  Leave: (gameId: number) => void;
  params: { slug: number };
}) {
  const router = useRouter();
  return (
    <div className="flex flex-row gap-1">
      <div className="flex w-1/12 bg-blue-500 p-1">
        {!!player.me && <SVGFilledDot></SVGFilledDot>}
      </div>
      <div className="flex w-1/2 bg-blue-500 p-1">{player.playerName}</div>
      <div className="flex w-1/3 items-center bg-blue-500 p-1">
        <FlavorIcon flavor={player.playerFlavor}></FlavorIcon>
      </div>
      <div className="flex w-1/6 bg-blue-500 p-1">
        {player.me && (
          <Button
            variant={"destructive"}
            className=" w-full"
            onMouseDown={(eventData) => {
              if (eventData.button === 0) {
                Leave(params.slug);
                router.push("/");
              }
            }}
          >
            {myGame ? "Cancel" : "Leave"}
          </Button>
        )}
      </div>
    </div>
  );
  //TODO allow player to change to any unclaimed flavor
}
