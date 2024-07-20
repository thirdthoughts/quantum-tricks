// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { cardColors, flavors, type PlayerBoard, type ResearchBoard } from "~/_util/constants";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `quantum-tricks_${name}`);

export const pgFlavorEnum = pgEnum('flavor', flavors);
export const pgColorEnum = pgEnum('cardColor', cardColors);

const lobbyPlayerSchema = z.object({
  playerName: z.string(),
  playerId: z.string(),
  playerFlavor: z.enum(flavors)
})

export const gameLobby = createTable(
  "lobby",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    gameSize: integer("playerCount").notNull(),
    creatorId: varchar("creatorId", { length: 128 }).notNull(),
    creatorName: varchar("creatorName", { length: 128 }).notNull(),
    players: jsonb('players').$type<z.infer<typeof lobbyPlayerSchema>[]>().notNull(),
    started: boolean("started").default(false),
  },
);

export type GamePlayer = {
  playerName: string,
  playerId: string,
  playerFlavor: typeof flavors[number],
  playerBoard: ReturnType<typeof PlayerBoard>,
  roundScores: number[],
  roundBids: number[],
  currentHand?: number[],
}

export type GamePlayerData = {
  players: GamePlayer[]
}

export const game = createTable(
  "game",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    playerData: jsonb('playerData').$type<GamePlayerData>().notNull(), //This should be in player order and never change after creation
    researchBoard: jsonb('researchBoard').$type<ReturnType<typeof ResearchBoard>>().notNull(), //current state of the research board
    currentPlayerIndex:  integer("currentPlayerIndex").notNull().default(0), //player currently acting in the trick
    currentRoundStartPlayerIndex: integer("currentRoundStartPlayerIndex").notNull(), //player who acted first this round
    currentRoundLeadColor: pgColorEnum("currentRoundLeadColor"), //color that was used to lead this trick
    currentRound: integer("currentRound").notNull().default(1), //current round number
    currentTrickLeadPlayerIndex: integer("currentTrickLeadPlayerIndex").default(0).notNull(), //index of the player to lead the current trick
    finished: boolean("finished").default(false).notNull(),
  }
);