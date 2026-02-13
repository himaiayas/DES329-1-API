import { Elysia, t } from "elysia";
import { adminUpdateUserUseCase } from "../usecases";
import { authService } from "../../auth/services";
import { updateUserSchema } from "../models";

export const adminUpdateUserRoute = new Elysia().put(
  "/admin/users/:userId",
  async ({ params: { userId }, body, set, cookie }) => {
    await authService.authAdmin(cookie);
    await adminUpdateUserUseCase({ data: body, userId });
    set.status = 200;
  },
  {
    body: updateUserSchema,
    params: t.Object({
      userId: t.String(),
    }),
  }
);
