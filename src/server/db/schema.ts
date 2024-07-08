// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `quantum-tricks_${name}`);

export const posts = createTable(
  "gameLobby",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    playerCount: integer("playerCount").default(3).notNull(),
    creator: varchar("creator", { length: 256 }),
    player2Id: varchar("player2Id", {length:128}),
    player3Id: varchar("player3Id", {length:128}),
    player4Id: varchar("player4Id", {length:128}),
    player5Id: varchar("player5Id", {length:128}),
    creatorFlavor: varchar("creatorFlavor", {length:12}),
    player2Flavor: varchar("player2Flavor", {length:12}),
    player3Flavor: varchar("player3Flavor", {length:12}),
    player4Flavor: varchar("player4Flavor", {length:12}),
    player5Flavor: varchar("player5Flavor", {length:12}),
  },
);
