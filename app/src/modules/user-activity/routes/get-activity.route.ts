import { Elysia } from "elysia";
import { userGetActivitiesUseCase } from "../usecases";
import { authService } from "../../auth/services";

export const userGetActivitiesRoute = new Elysia().get(
  "/user/activity",
  async ({ set, cookie }) => {
    const session = await authService.authUser(cookie);
    const activities = await userGetActivitiesUseCase({
      userId: session.session.userId,
    });

    set.status = 200;
    return activities;
  }
);
