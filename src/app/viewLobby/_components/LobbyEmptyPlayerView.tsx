"use client";

import {
  FlavorIcon,
} from "~/_svg/flavorIcons";

export default function LobbyEmptyPlayerView() {
  return (
    <div className="flex flex-row gap-1">
      <div className="flex w-1/12 bg-slate-200 p-1"></div>
      <div className="flex w-1/2 bg-slate-200 p-1">Empty</div>
      <div className="flex w-1/3 bg-slate-200 p-1">
        <FlavorIcon flavor="Top"></FlavorIcon>
        <FlavorIcon flavor="Bottom"></FlavorIcon>
        <FlavorIcon flavor="Charm"></FlavorIcon>
        <FlavorIcon flavor="Strange"></FlavorIcon>
        <FlavorIcon flavor="Up"></FlavorIcon>
        <FlavorIcon flavor="Down"></FlavorIcon>
      </div>
    </div>
  );
}
