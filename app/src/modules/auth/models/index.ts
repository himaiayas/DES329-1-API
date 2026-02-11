import { Static, t } from "elysia";
import { createSelectSchema, createInsertSchema } from "drizzle-typebox";
import { usersTable, sessionsTable } from "../../../db/schemas";

export const userSchema = createSelectSchema(usersTable);
export type User = Static<typeof userSchema>;

const _createUserSchema = createInsertSchema(usersTable, {
  email: t.String({ format: "email" }),
});

export const createUserSchema = t.Object({
  email: _createUserSchema.properties.email,
  password: _createUserSchema.properties.hashedPassword,
  group: _createUserSchema.properties.group,
});
export type CreateUser = Static<typeof createUserSchema>;

export const userCredentialSchema = t.Object({
  email: _createUserSchema.properties.email,
  password: _createUserSchema.properties.hashedPassword,
});

export type UserCredential = Static<typeof userCredentialSchema>;

export const sessionSchema = createSelectSchema(sessionsTable);
export type Session = Static<typeof sessionSchema>;

export type SessionWithUser = {
  session: Session;
  user: User;
};
