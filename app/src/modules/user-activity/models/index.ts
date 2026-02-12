import { Static, t } from "elysia";
import { createSelectSchema, createInsertSchema } from "drizzle-typebox";
import { activitiesTable } from "../../../db/schemas";
import { Simplify } from "drizzle-orm";

export const userActivitySchema = createSelectSchema(activitiesTable);
export type UserActivity = Static<typeof userActivitySchema>;

const _createUserActivitySchema = createInsertSchema(activitiesTable, {
  date: t.String({ format: "date-time" }),
});
export const createUserActivitySchema = t.Omit(_createUserActivitySchema, [
  "organizerId",
  "id",
  "createdAt",
  "updatedAt",
]);

export type CreateUserActivity = Simplify<
  Omit<Static<typeof createUserActivitySchema>, "date"> & {
    date: Date;
  }
>;

export const updateUserActivitySchema = t.Partial(createUserActivitySchema);
export type UpdateUserActivity = Simplify<
  Omit<Static<typeof updateUserActivitySchema>, "date"> & {
    date?: Date;
  }
>;
