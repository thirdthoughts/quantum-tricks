import { z } from "zod";
import { maxPlayers, minPlayers } from "./constants";

export const playerSchema = z.object({
    playerName: z.string(),
    playerFlavor: z.string(),
    me: z.boolean().optional(),
  });
  
export const gameSchema = z.object({
    id: z.number(),
    playerCount: z.number().gte(minPlayers).lte(maxPlayers),
    creator: z.string(),
    mine: z.boolean(),
    players: z
      .array(
        playerSchema
      )
      .min(1)
      .max(5), //TODO consider making an "or" schema around each player count to make this max always match the game settings
  });

export function validPlayer(p: any): p is {playerName: string, playerFlavor: string, me?: boolean} {
    return playerSchema.safeParse(p).success;
}