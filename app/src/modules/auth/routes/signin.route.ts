import { Elysia } from "elysia";
import { signInUseCase } from "../usecases";
import { UserCredential, userCredentialSchema } from "../models";
import { authService } from "../services";

export const signInRoute = new Elysia().post(
  "/auth/signin",
  async ({ body, set, cookie }) => {
    const { email, password } = body as UserCredential;
    const session = await signInUseCase({ email, password });

    authService.setCookie(cookie, session.id);

    set.status = 200;
  },
  {
    body: userCredentialSchema,
  }
);
