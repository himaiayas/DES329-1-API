import { Elysia } from "elysia";
import { adminGetUsersUseCase } from "../usecases";
import { authService } from "../../auth/services";

export const adminGetUsersRoute = new Elysia().get(
  "/admin/users",
  async ({ set, cookie }) => {
    await authService.authAdmin(cookie);
    const users = adminGetUsersUseCase();
    set.status = 200;
    return users;
  }
);
