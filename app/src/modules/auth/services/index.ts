import { CustomError, HTTP_STATUS } from "../../../shared/error";
import { Session, SessionWithUser, User } from "../models";
import { authRepo } from "../repository";

function setCookie(cookie: any, sessionId: string): void {
  const sid = cookie.sid;
  sid.value = sessionId;
  sid.httpOnly = true;
  sid.secure = true;
  sid.sameSite = "lax";
  sid.path = "/";
  sid.maxAge = 60 * 60 * 24 * 7; // 7 days
}

function removeCookie(cookie: any): void {
  const sid = cookie.sid;
  sid.remove();
}

async function auth(cookie: any): Promise<SessionWithUser> {
  const sid = cookie.sid;
  const sessionId = sid.value;
  console.log(sessionId);
  if (!sessionId) throw new CustomError(HTTP_STATUS.UNAUTHORIZED);

  return authRepo.getSessionWithUserById({ id: sessionId });
}

async function authOrganizer(cookie: any): Promise<SessionWithUser> {
  const session = await auth(cookie);
  if (session.user.role === "organizer") return session;
  else throw new CustomError(HTTP_STATUS.FORBIDDEN);
}

async function authAdmin(cookie: any): Promise<SessionWithUser> {
  const session = await auth(cookie);
  if (session.user.role === "admin") return session;
  else throw new CustomError(HTTP_STATUS.FORBIDDEN);
}

export const authService = {
  setCookie,
  removeCookie,
  auth,
  authOrganizer,
  authAdmin,
};
