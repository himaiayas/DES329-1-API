import { Elysia } from "elysia";
import { userGetActivitiesRoute } from "./get-activity.route";
import { userCreateActivitiyRoute } from "./create-activity.route";

export const userActivityRoute = new Elysia()
  .use(userGetActivitiesRoute)
  .use(userCreateActivitiyRoute);
