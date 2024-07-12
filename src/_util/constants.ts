import { z } from "zod";

export const minPlayers = 3;
export const maxPlayers = 5;

export const PlayerCount = z.number().gte(3);

export const flavors = [
  "Up",
  "Down",
  "Charm",
  "Spin",
  "Strange",
  "Bottom",
  "Top",
] as const;

