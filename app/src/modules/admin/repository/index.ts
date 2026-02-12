import { db } from "../../../db";
import { roleEnum, usersTable } from "../../../db/schemas";
import { eq, or } from "drizzle-orm";
import { UserEntry } from "../models";

export const adminRepository = {
  fetchAll: async () : Promise<UserEntry[]> => {
    return (await db.select().from(usersTable));
  },

  deleteById: async ( { userId }: { userId: UserEntry["id"]  } ) : Promise<UserEntry[]> => {
    return await db.delete(usersTable)
      .where(eq(usersTable.id, userId))
      .returning();
  }
};