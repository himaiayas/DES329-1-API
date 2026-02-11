import { eq, and, gt } from "drizzle-orm";
import { db } from "../../../db";
import { sessionsTable, usersTable } from "../../../db/schemas";
import type { CreateUser, Session, SessionWithUser, User } from "../models";
import { findOne, findOneOrThrow } from "../../../db/utils";

async function getUserById({ id }: { id: User["id"] }): Promise<User | null> {
  return db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id))
    .then(findOne);
}

async function getUserByEmail({
  email,
}: {
  email: User["email"];
}): Promise<User | null> {
  return db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .then(findOne);
}

async function createUser({
  email,
  password,
  group,
}: CreateUser): Promise<User> {
  return db
    .insert(usersTable)
    .values({
      email,
      group,
      hashedPassword: password,
    })
    .returning()
    .then(findOneOrThrow);
}

async function getSessionWithUserById({
  id,
}: {
  id: Session["id"];
}): Promise<SessionWithUser> {
  return db
    .select({
      user: usersTable,
      session: sessionsTable,
    })
    .from(sessionsTable)
    .innerJoin(usersTable, eq(usersTable.id, sessionsTable.userId))
    .where(
      and(eq(sessionsTable.id, id), gt(sessionsTable.expiresAt, new Date()))
    )
    .then(findOneOrThrow);
}

async function createSession({
  userId,
  expiresAt,
}: Pick<Session, "userId" | "expiresAt">): Promise<Session> {
  return db
    .insert(sessionsTable)
    .values({ userId, expiresAt })
    .returning()
    .then(findOneOrThrow);
}

async function updateSession({
  id,
  expiresAt,
}: Pick<Session, "id" | "expiresAt">): Promise<Session> {
  return db
    .update(sessionsTable)
    .set({ expiresAt })
    .where(eq(sessionsTable.id, id))
    .returning()
    .then(findOneOrThrow);
}

export const authRepo = {
  getUserById,
  getUserByEmail,
  createUser,
  getSessionWithUserById,
  createSession,
  updateSession,
};
