"use client";

import { type z } from "zod";
import { type playerSchema } from "~/_util/validation";
import BottomFlavorIcon from "~/app/_svg/bottom";
import { CharmFlavorIcon } from "~/app/_svg/charm";
import DownFlavorIcon from "~/app/_svg/down";
import { SVGFilledDot } from "~/app/_svg/filledDot";
import { StrangeFlavorIcon } from "~/app/_svg/strange";
import { TopFlavorIcon } from "~/app/_svg/top";
import UpFlavorIcon from "~/app/_svg/up";

export default function LobbyEmptyPlayerView() {
  return (
    <div className="flex flex-row gap-1">
      <div className="flex w-1/12 bg-slate-200 p-1"></div>
      <div className="flex w-1/2 bg-slate-200 p-1">Empty</div>
      <div className="flex w-1/3 bg-slate-200 p-1">
        <TopFlavorIcon></TopFlavorIcon>
        <StrangeFlavorIcon></StrangeFlavorIcon>
        <BottomFlavorIcon></BottomFlavorIcon>
        <CharmFlavorIcon></CharmFlavorIcon>
        <UpFlavorIcon></UpFlavorIcon>
        <DownFlavorIcon></DownFlavorIcon>
      </div>
    </div>
  );
}
