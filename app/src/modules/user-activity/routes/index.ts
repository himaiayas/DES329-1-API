import { Elysia } from "elysia";

const userActivityRoute = new Elysia().get(
  "/activity",
  ({ status, body }) => {}
);
