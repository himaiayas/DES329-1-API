import { db } from "../../../db";
import { activitiesTable } from "../../../db/schemas";
import { findOneOrThrow } from "../../../db/utils";
import type { CreateUserActivity, UserActivity } from "../models";
import { eq } from "drizzle-orm";

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

async function create({
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

export const userActivityRepo = {
  getByUser,
  create,
};
