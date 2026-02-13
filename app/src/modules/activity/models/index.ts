import { Static, t } from "elysia";
import { createSelectSchema } from "drizzle-typebox";
import { activitiesTable, usersTable } from "../../../db/schemas";
import { Simplify } from "drizzle-orm";

const activitySchema = createSelectSchema(activitiesTable);
const userSchema = createSelectSchema(usersTable);
export type Activity = Static<typeof activitySchema>;

export type ActivityWithOrganizer = Simplify<
  Activity & {
    group: Static<typeof userSchema>["group"];
  }
>;

export const getActivityQuerySchema = t.Partial(
  t.Object({
    ...t.Pick(activitySchema, ["venue", "registrant"]).properties,
    group: userSchema.properties.group,
  })
);

export type GetActivityQuery = Static<typeof getActivityQuerySchema>;
