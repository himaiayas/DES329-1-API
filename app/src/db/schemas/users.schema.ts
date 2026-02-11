import { pgTable, pgEnum, uuid, text } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("user_role_enum", ["user", "admin"]);

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  group: text("group"),
  role: roleEnum("role").notNull().default("user"),
});
