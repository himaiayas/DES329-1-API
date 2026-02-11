import { Elysia } from "elysia";
import { userGetActivities } from "../usecases";
import { CustomError, HTTP_STATUS } from "../../../shared/error";

export const userActivityRoute = new Elysia().get(
  "/user/activity",
  async ({ set }) => {
    const userId = "9b19d4e7-04fd-4dde-aefa-582766403627";
    const activities = await userGetActivities({ userId });

    set.status = 200;
    return activities;
  }
);
