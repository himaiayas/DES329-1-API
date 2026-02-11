import { Elysia } from "elysia";
import { signupUseCase } from "../usecases";
import { CreateUser, createUserSchema } from "../models";
import { authService } from "../services";

export const signUpRoute = new Elysia().post(
  "/auth/signup",
  async ({ body, set, cookie }) => {
    const { email, password, group } = body as CreateUser;
    const session = await signupUseCase({ email, password, group });

    authService.setCookie(cookie, session.id);

    set.status = 201;
  },
  {
    body: createUserSchema,
  }
);
