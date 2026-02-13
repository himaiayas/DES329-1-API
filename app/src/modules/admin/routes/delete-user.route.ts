import { Elysia, t } from "elysia";
import { adminDeleteUserUseCase } from "../usecases";
import { authService } from "../../auth/services";

export const adminDeleteUserRoute = new Elysia().delete(
  "/admin/users/:userId",
  async ({ params: { userId }, set, cookie }) => {
    await authService.authAdmin(cookie);
    await adminDeleteUserUseCase({ userId });
    set.status = 200;
  },
  {
    params: t.Object({
      userId: t.String(),
    }),
  }
);
