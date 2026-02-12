import { Static, t } from "elysia";
import { createSelectSchema } from "drizzle-typebox";
import { usersTable } from "../../../db/schemas";


export const userResponseSchema = createSelectSchema(usersTable);

export type UserEntry = Static<typeof userResponseSchema>;

export const deleteUserParams = t.Object({
  id: t.Numeric() 
});