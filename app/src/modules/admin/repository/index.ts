import { db } from "../../../db";
import { usersTable } from "../../../db/schemas";
import { eq, getTableColumns, or } from "drizzle-orm";
import { UpdateUser, User } from "../models";
import { QueryResult } from "pg";
import { findOneOrThrow } from "../../../db/utils";

async function getUsers(): Promise<User[]> {
  const { hashedPassword, ...columns } = getTableColumns(usersTable);
  return db.select(columns).from(usersTable);
}

async function deleteUser({
  userId,
}: {
  userId: User["id"];
}): Promise<QueryResult<never>> {
  return db.delete(usersTable).where(eq(usersTable.id, userId));
}

async function updateUser({
  data,
  userId,
}: {
  data: UpdateUser;
  userId: User["id"];
}): Promise<User> {
  return db
    .update(usersTable)
    .set(data)
    .where(eq(usersTable.id, userId))
    .returning()
    .then(findOneOrThrow);
}

export const adminRepo = {
  getUsers,
  deleteUser,
  updateUser,
};
