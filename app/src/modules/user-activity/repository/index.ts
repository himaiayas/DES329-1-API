import { QueryResult } from "pg";
import { db } from "../../../db";
import { activitiesTable } from "../../../db/schemas";
import { findOneOrThrow } from "../../../db/utils";
import type {
  CreateUserActivity,
  UpdateUserActivity,
  UserActivity,
} from "../models";
import { eq, and } from "drizzle-orm";

async function getByUser({
  userId,
}: {
  userId: UserActivity["organizerId"];
}): Promise<UserActivity[]> {
  return db
    .select()
    .from(activitiesTable)
    .where(eq(activitiesTable.organizerId, userId));
}

async function createActivity({
  data,
  userId,
}: {
  data: CreateUserActivity;
  userId: UserActivity["organizerId"];
}): Promise<UserActivity> {
  return db
    .insert(activitiesTable)
    .values({ ...data, organizerId: userId })
    .returning()
    .then(findOneOrThrow);
}

async function updateActivity({
  data,
  userId,
  id,
}: {
  data: UpdateUserActivity;
  userId: UserActivity["organizerId"];
  id: UserActivity["id"];
}): Promise<UserActivity> {
  return db
    .update(activitiesTable)
    .set(data)
    .where(
      and(eq(activitiesTable.id, id), eq(activitiesTable.organizerId, userId))
    )
    .returning()
    .then(findOneOrThrow);
}

async function deleteActivity({
  id,
  userId,
}: {
  id: UserActivity["id"];
  userId: UserActivity["organizerId"];
}): Promise<QueryResult<never>> {
  return db
    .delete(activitiesTable)
    .where(
      and(eq(activitiesTable.id, id), eq(activitiesTable.organizerId, userId))
    );
}

export const userActivityRepo = {
  getByUser,
  createActivity,
  updateActivity,
  deleteActivity,
};
