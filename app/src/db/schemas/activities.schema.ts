import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { usersTable } from "./users.schema";

export const registrantEnum = pgEnum("registrant_enum", [
  "staff",
  "participant",
]);
export const venueEnum = pgEnum("venue_enum", ["On-Campus", "Off-Campus"]);

export const activitiesTable = pgTable("activities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  date: timestamp("date", { withTimezone: true }).notNull(),
  registrant: registrantEnum("registrant").notNull().default("participant"),
  venue: venueEnum("venue"),
  organizerId: uuid("organizer_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
