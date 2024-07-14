"use client";

import BottomFlavorIcon from "~/_svg/bottom";
import { CharmFlavorIcon } from "~/_svg/charm";
import DownFlavorIcon from "~/_svg/down";
import { StrangeFlavorIcon } from "~/_svg/strange";
import { TopFlavorIcon } from "~/_svg/top";
import UpFlavorIcon from "~/_svg/up";

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
