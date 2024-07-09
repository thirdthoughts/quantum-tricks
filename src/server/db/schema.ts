// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  json,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { flavors } from "~/util/constants";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `quantum-tricks_${name}`);

export const gameLobby = createTable(
  "gameLobby",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    playerCount: integer("playerCount").notNull(),
    creatorId: varchar("creatorId", { length: 128 }).notNull(),
    player2Id: varchar("player2Id", {length:128}),
    player3Id: varchar("player3Id", {length:128}),
    player4Id: varchar("player4Id", {length:128}),
    player5Id: varchar("player5Id", {length:128}),
    creator: varchar("creator", { length: 128 }).notNull(),
    player2: varchar("player2", {length:128}),
    player3: varchar("player3", {length:128}),
    player4: varchar("player4", {length:128}),
    player5: varchar("player5", {length:128}),
    creatorFlavor: varchar("creatorFlavor", {length:12}).notNull(),
    player2Flavor: varchar("player2Flavor", {length:12}),
    player3Flavor: varchar("player3Flavor", {length:12}),
    player4Flavor: varchar("player4Flavor", {length:12}),
    player5Flavor: varchar("player5Flavor", {length:12}),
    started: boolean("started").default(false),
  },
);

const gamePlayerSchema = z.object({
  playerName: z.string(),
  playerId: z.string(),
  playerFlavor: z.enum(flavors)
})

export const game = createTable(
  "game",
  {
    d: serial("id").primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    players: json('players').$type<z.infer<typeof gamePlayerSchema>[]>(), //This should be in player order and never change after creation
  }
);