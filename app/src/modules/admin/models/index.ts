import { Static, t } from "elysia";
import { createSelectSchema } from "drizzle-typebox";
import { usersTable } from "../../../db/schemas";

export const _userSchema = createSelectSchema(usersTable);
export const userSchema = t.Omit(_userSchema, ["hashedPassword"]);
export type User = Static<typeof userSchema>;

export const updateUserSchema = t.Partial(
  t.Pick(userSchema, ["group", "role"])
);
export type UpdateUser = Static<typeof updateUserSchema>;
