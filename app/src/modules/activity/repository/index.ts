import { getColumns } from "drizzle-typebox";
import { db } from "../../../db";
import { activitiesTable, usersTable } from "../../../db/schemas";
import { findOneOrThrow } from "../../../db/utils";
import { eq, gte, and, like } from "drizzle-orm";
import { getTableColumns } from "drizzle-orm";




const {name, description, date, registrant, venue} = getTableColumns(activitiesTable)
const {group} = getTableColumns(usersTable)

async function getEvents(query) {

    let conds = [
        eq(activitiesTable.isActive, true), 
        gte(activitiesTable.date,new Date())
        ]

    
    if ('registrant' in query){
        conds.push(eq(activitiesTable.registrant, query.registrant))
    }
    if ('venue' in query){
        conds.push(eq(activitiesTable.venue, query.venue))
    }
    if ('group' in query){
        conds.push(like(usersTable.group, `%${query.group}%`))
    }


    return db
        .select({
            name, description, date, registrant, venue, group
        })
        .from(activitiesTable)
        .innerJoin(usersTable, eq(activitiesTable.organizerId, usersTable.id))
        .where(
            and(
                ...conds
            ));
}

export const activityRepo = {
  getEvents
};
