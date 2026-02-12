import { Elysia } from "elysia";
import { getActivitiesUseCase } from "../usecases";


export const activityRoute = new Elysia().get(
  "/activity",
  async ({ set, query }) => {
    const activities = await getActivitiesUseCase(query);
    set.status = 200;
    return activities;
  }
);
