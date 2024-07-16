import { z } from "zod";
import { flavors, maxPlayers, minPlayers } from "./constants";

export const playerSchema = z.object({
    playerName: z.string(),
    playerFlavor: z.enum(flavors),
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

export function validPlayer(p: z.infer<typeof playerSchema> | {playerName: string | null, playerFlavor: typeof flavors[number] | null, me?: boolean}): p is z.infer<typeof playerSchema> {
    return playerSchema.safeParse(p).success;
}