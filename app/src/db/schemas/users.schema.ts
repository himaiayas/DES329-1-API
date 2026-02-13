import { pgTable, pgEnum, uuid, text } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("user_role_enum", [
  "guest",
  "organizer",
  "admin",
]);

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashed_password").notNull(),
  group: text("group"),
  role: roleEnum("role").default("guest"),
});
