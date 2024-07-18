"use client";

import { useState } from "react";
import { FlavorIcon } from "~/_svg/flavorIcons";
import { type flavors } from "~/_util/constants";
import { Button } from "~/components/ui/button";

export default function LobbyEmptyPlayerView({
  params,
  alreadyIn,
  Join,
  availableFlavors,
}: {
  params: { slug: number };
  alreadyIn: boolean;
  Join: (gameId: number) => void;
  availableFlavors: (typeof flavors)[number][];
}) {
  const [selectedFlavor, setSelectedFlavor] = useState(availableFlavors[0]);
  return (
    <div className="flex flex-row gap-1">
      <div className="flex w-1/12 bg-slate-300 p-1"></div>
      <div className="flex w-1/2 bg-slate-300 p-1">Open</div>
      <div className="flex w-1/3 bg-slate-300 p-1">
        {availableFlavors.includes("Top") && (
          <div>
            <input
              className="peer sr-only"
              type="radio"
              value="Top"
              name="playerFlavor"
              id={`flavor_top_${params.slug}`}
              checked={selectedFlavor === "Top"}
              onChange={() => setSelectedFlavor("Top")}
            />
            <label
              className="flex cursor-pointer rounded-lg p-1 ring-2
                  focus:outline-none peer-checked:border-transparent peer-checked:bg-green-500"
              htmlFor={`flavor_top_${params.slug}`}
            >
              <FlavorIcon flavor="Top"></FlavorIcon>
            </label>
          </div>
        )}
        {availableFlavors.includes("Bottom") && (
          <div>
            <input
              className="peer sr-only"
              type="radio"
              value="Bottom"
              name="playerFlavor"
              id={`flavor_bottom_${params.slug}`}
              checked={selectedFlavor === "Bottom"}
              onChange={() => setSelectedFlavor("Bottom")}
            />
            <label
              className="flex cursor-pointer rounded-lg p-1 ring-2
                  focus:outline-none peer-checked:border-transparent peer-checked:bg-green-500"
              htmlFor={`flavor_bottom_${params.slug}`}
            >
              <FlavorIcon flavor="Bottom"></FlavorIcon>
            </label>
          </div>
        )}
        {availableFlavors.includes("Up") && (
          <div>
            <input
              className="peer sr-only"
              type="radio"
              value="Up"
              name="playerFlavor"
              id={`flavor_up_${params.slug}`}
              checked={selectedFlavor === "Up"}
              onChange={() => setSelectedFlavor("Up")}
            />
            <label
              className="flex cursor-pointer rounded-lg p-1 ring-2
                  focus:outline-none peer-checked:border-transparent peer-checked:bg-green-500"
              htmlFor={`flavor_up_${params.slug}`}
            >
              <FlavorIcon flavor="Up"></FlavorIcon>
            </label>
          </div>
        )}
        {availableFlavors.includes("Down") && (
          <div>
            <input
              className="peer sr-only"
              type="radio"
              value="Down"
              name="playerFlavor"
              id={`flavor_down_${params.slug}`}
              checked={selectedFlavor === "Down"}
              onChange={() => setSelectedFlavor("Down")}
            />
            <label
              className="flex cursor-pointer rounded-lg p-1 ring-2
                  focus:outline-none peer-checked:border-transparent peer-checked:bg-green-500"
              htmlFor={`flavor_down_${params.slug}`}
            >
              <FlavorIcon flavor="Down"></FlavorIcon>
            </label>
          </div>
        )}
        {availableFlavors.includes("Strange") && (
          <div>
            <input
              className="peer sr-only"
              type="radio"
              value="Strange"
              name="playerFlavor"
              id={`flavor_strange_${params.slug}`}
              checked={selectedFlavor === "Strange"}
              onChange={() => setSelectedFlavor("Strange")}
            />
            <label
              className="flex cursor-pointer rounded-lg p-1 ring-2
                  focus:outline-none peer-checked:border-transparent peer-checked:bg-green-500"
              htmlFor={`flavor_strange_${params.slug}`}
            >
              <FlavorIcon flavor="Strange"></FlavorIcon>
            </label>
          </div>
        )}
      </div>
      <div className="flex w-1/6">
        {!alreadyIn && (
          <Button
            variant={"do"}
            className=" w-full"
            onMouseDown={(eventData) => {
              if (eventData.button === 0) Join(params.slug);
            }}
          >
            Join
          </Button>
        )}
      </div>
    </div>
  );
  //TODO allow joining as a specified flavor!
}
