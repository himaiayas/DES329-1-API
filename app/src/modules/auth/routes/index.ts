import { Elysia } from "elysia";
import { signUpRoute } from "./signup.route";
import { signInRoute } from "./signin.route";
import { signOutRoute } from "./signout.route";

export const authRoute = new Elysia()
  .use(signUpRoute)
  .use(signInRoute)
  .use(signOutRoute);
