export class StatusJSON<T = unknown> {
  constructor(
    public status: number,
    public code: string,
    public message: string
  ) {}
}

export const HTTP_STATUS = {
  OK: new StatusJSON(200, "OK", "Success OK"),
  CREATED: new StatusJSON(201, "Created", "Success created"),
  BAD_REQUEST: new StatusJSON(400, "Bad_Request", "Invalid request"),
  UNAUTHORIZED: new StatusJSON(
    401,
    "Unauthorized",
    "Request is unauthenticated"
  ),
  FORBIDDEN: new StatusJSON(403, "Forbidden", "Request is forbidden"),
  NOT_FOUND: new StatusJSON(404, "Not_Found", "Resource not found"),
  CONFLICT: new StatusJSON(
    409,
    "Conflict",
    "Request conflicted with business rule"
  ),
  RATE_LIMIT: new StatusJSON(
    429,
    "Too many requests",
    "Number of requests exceed rate limit"
  ),
  SERVER_ERROR: new StatusJSON(
    500,
    "Internal_Server_Error",
    "Internal server error"
  ),
} as const;

export class CustomError extends Error {
  code: string;
  status: number;

  constructor(statusJson: StatusJSON, message?: string) {
    super(message ?? statusJson.message);
    this.code = statusJson.code;
    this.status = statusJson.status;
  }
}
