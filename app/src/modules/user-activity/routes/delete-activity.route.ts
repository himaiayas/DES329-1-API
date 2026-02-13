import { Elysia, t } from "elysia";
import { userDeleteActivityUseCase } from "../usecases";
import { authService } from "../../auth/services";

export const userDeleteActivitiyRoute = new Elysia().delete(
  "/user/activity/:activityId",
  async ({ params: { activityId }, set, cookie }) => {
    const session = await authService.authOrganizer(cookie);
    await userDeleteActivityUseCase({
      userId: session.user.id,
      id: activityId,
    });

    set.status = 200;
  },
  {
    params: t.Object({
      activityId: t.String(),
    }),
  }
);
