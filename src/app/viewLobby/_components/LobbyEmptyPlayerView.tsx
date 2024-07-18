"use client";

import { FlavorIcon } from "~/_svg/flavorIcons";
import { Button } from "~/components/ui/button";

export default function LobbyEmptyPlayerView({
  params,
  alreadyIn,
  Join,
}: {
  params: { slug: number };
  alreadyIn: boolean;
  Join: (gameId: number) => void;
}) {
  return (
    <div className="flex flex-row gap-1">
      <div className="flex w-1/12 bg-slate-200 p-1"></div>
      <div className="flex w-1/2 bg-slate-200 p-1">Empty</div>
      <div className="flex w-1/6 bg-slate-200 p-1">
        <FlavorIcon flavor="Top"></FlavorIcon>
        <FlavorIcon flavor="Bottom"></FlavorIcon>
        <FlavorIcon flavor="Charm"></FlavorIcon>
        <FlavorIcon flavor="Strange"></FlavorIcon>
        <FlavorIcon flavor="Up"></FlavorIcon>
        <FlavorIcon flavor="Down"></FlavorIcon>
      </div>
      <div className="flex w-1/6 bg-slate-200 p-1">{!alreadyIn && (
          <Button
            variant={"do"}
            className=" w-full"
            onMouseDown={(eventData) => {
              if (eventData.button === 0) Join(params.slug);
            }}
          >
            Join
          </Button>
        )}</div>
    </div>
  );
  //TODO allow joining as a specified flavor!
  //TODO allow player to join as one of the available flavors
}
