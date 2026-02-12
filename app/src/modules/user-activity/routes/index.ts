import { Elysia } from "elysia";
import { userGetActivitiesRoute } from "./get-activity.route";
import { userCreateActivitiyRoute } from "./create-activity.route";
import { userUpdateActivitiyRoute } from "./update-activity.route";
import { userDeleteActivitiyRoute } from "./delete-activity.route";

export const userActivityRoute = new Elysia()
  .use(userGetActivitiesRoute)
  .use(userCreateActivitiyRoute)
  .use(userUpdateActivitiyRoute)
  .use(userDeleteActivitiyRoute);
