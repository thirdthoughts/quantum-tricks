// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  json,
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
    players: json('players').$type<z.infer<typeof lobbyPlayerSchema>[]>().notNull(),
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
    players: json('players').$type<GamePlayer[]>().notNull(), //This should be in player order and never change after creation
    researchBoard: json('researchBoard').$type<ReturnType<typeof ResearchBoard>>().notNull(), //current state of the research board
    currentPlayerIndex:  integer("currentPlayerIndex").notNull().default(0),
    currentRoundStartPlayerIndex: integer("currentRoundStartPlayerIndex").notNull(),
    currentRoundLeadColor: pgColorEnum("currentRoundLeadColor"),
    currentRound: integer("currentRound").notNull().default(1),
    finished: boolean("finished").default(false).notNull(),
  }
);