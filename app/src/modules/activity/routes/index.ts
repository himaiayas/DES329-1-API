import { Elysia } from "elysia";
import { getActivitiesUseCase } from "../usecases";
import { getActivityQuerySchema } from "../models";

export const activityRoute = new Elysia().get(
  "/activity",
  async ({ set, query }) => {
    console.log(query);
    const activities = await getActivitiesUseCase(query);
    set.status = 200;
    return activities;
  },
  {
    query: getActivityQuerySchema,
  }
);
