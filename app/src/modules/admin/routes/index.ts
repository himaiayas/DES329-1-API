import { Elysia } from "elysia";
import { adminGetUsersRoute } from "./get-users.route";
import { adminDeleteUserRoute } from "./delete-user.route";
import { adminUpdateUserRoute } from "./update-user.route";

export const adminRoute = new Elysia()
  .use(adminGetUsersRoute)
  .use(adminDeleteUserRoute)
  .use(adminUpdateUserRoute);
