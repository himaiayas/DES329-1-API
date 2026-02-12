import { Elysia, t } from "elysia";
import { userUpdateActivityUseCase } from "../usecases";
import { updateUserActivitySchema } from "../models";
import { authService } from "../../auth/services";

export const userUpdateActivitiyRoute = new Elysia().put(
  "/user/activity/:activityId",
  async ({ params: { activityId }, body, set, cookie }) => {
    const session = await authService.authUser(cookie);
    const data = {
      ...body,
      date: body.date ? new Date(body.date) : undefined,
    };
    const activity = await userUpdateActivityUseCase({
      data: data,
      userId: session.user.id,
      id: activityId,
    });

    set.status = 200;
    return activity;
  },
  {
    body: updateUserActivitySchema,
    params: t.Object({
      activityId: t.String(),
    }),
  }
);
