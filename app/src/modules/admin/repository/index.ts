import { db } from "../../../db";
import { usersTable } from "../../../db/schemas";
import { eq, or } from "drizzle-orm";
import { UserEntry } from "../models";

export const adminRepository = {
  fetchAll: async () => {
    return await db.select().from(usersTable);
  },

  deleteById: async ( { userId }: { userId: UserEntry["id"]  } ) => {
    return await db.delete(usersTable)
      .where(eq(usersTable, userId))
      .returning();
  }
};