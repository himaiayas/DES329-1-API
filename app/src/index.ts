import { Elysia } from "elysia";
import { userActivityRoute } from "./modules/user-activity/routes";
import { CustomError } from "./shared/error";

const app = new Elysia({ prefix: "/api" })
  .onError(({ code, error, set }) => {
    if (error instanceof CustomError) {
      set.status = error.status;
      return error.message;
    } else if (code === "VALIDATION") {
      set.status = 400;
      return error;
    }

    set.status = 500;
    return "Unknown Error";
  })
  .use(userActivityRoute)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
