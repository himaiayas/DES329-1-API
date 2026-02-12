import { Elysia } from "elysia";
import { signOutUseCase } from "../usecases";
import { UserCredential, userCredentialSchema } from "../models";
import { authService } from "../services";

export const signOutRoute = new Elysia().post(
  "/auth/signout",
  async ({ set, cookie }) => {
    const session = await authService.auth(cookie);
    await signOutUseCase({ sessionId: session.session.id });
    authService.removeCookie(cookie);

    set.status = 200;
  }
);
