import { Static, t } from "elysia";
import { createSelectSchema, createInsertSchema } from "drizzle-typebox";
import { activitiesTable } from "../../../db/schemas";

export const userActivitySchema = createSelectSchema(activitiesTable);
export type UserActivity = Static<typeof userActivitySchema>;

const _createUserActivitySchema = createInsertSchema(activitiesTable);
export const createUserActivitySchema = t.Omit(_createUserActivitySchema, [
  "organizerId",
  "id",
  "createdAt",
  "updatedAt",
]);
export type CreateUserActivity = Static<typeof createUserActivitySchema>;

export const updateUserActivitySchema = t.Partial(createUserActivitySchema);
export type UpdateUserActivity = Static<typeof updateUserActivitySchema>;
