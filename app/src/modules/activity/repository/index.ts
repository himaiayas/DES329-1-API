import { db } from "../../../db";
import { activitiesTable, usersTable } from "../../../db/schemas";
import { eq, and, like } from "drizzle-orm";
import { getTableColumns } from "drizzle-orm";
import { ActivityWithOrganizer, GetActivityQuery } from "../models";

async function getActivities(
  query: GetActivityQuery
): Promise<ActivityWithOrganizer[]> {
  let conds = [];

  console.log(query);

  if (query.registrant) {
    conds.push(eq(activitiesTable.registrant, query.registrant));
  }
  if (query.venue) {
    conds.push(eq(activitiesTable.venue, query.venue));
  }
  if (query.group) {
    conds.push(like(usersTable.group, `%${query.group}%`));
  }

  return db
    .select({
      ...getTableColumns(activitiesTable),
      group: usersTable.group,
    })
    .from(activitiesTable)
    .innerJoin(usersTable, eq(activitiesTable.organizerId, usersTable.id))
    .where(and(...conds));
}

export const activityRepo = {
  getActivities,
};
