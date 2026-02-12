import { Elysia } from "elysia";
import { userGetActivitiesUseCase } from "../usecases";

export const userGetActivitiesRoute = new Elysia().get(
  "/user/activity",
  async ({ set }) => {
    const userId = "9b19d4e7-04fd-4dde-aefa-582766403627";
    const activities = await userGetActivitiesUseCase({ userId });

    set.status = 200;
    return activities;
  }
);
