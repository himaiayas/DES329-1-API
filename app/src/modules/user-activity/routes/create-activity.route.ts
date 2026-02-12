import { Elysia } from "elysia";
import { userCreateActivityUseCase } from "../usecases";
import { createUserActivitySchema } from "../models";
import { authService } from "../../auth/services";

export const userCreateActivitiyRoute = new Elysia().post(
  "/user/activity",
  async ({ body, set, cookie }) => {
    const session = await authService.authUser(cookie);
    const activity = await userCreateActivityUseCase({
      data: {
        ...body,
        date: new Date(body.date),
      },
      userId: session.user.id,
    });

    set.status = 201;
    return activity;
  },
  {
    body: createUserActivitySchema,
  }
);
