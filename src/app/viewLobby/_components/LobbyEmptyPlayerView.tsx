"use client";

import {
  BottomFlavorIcon,
  CharmFlavorIcon,
  DownFlavorIcon,
  StrangeFlavorIcon,
  TopFlavorIcon,
  UpFlavorIcon,
} from "~/_svg/flavorIcons";

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
