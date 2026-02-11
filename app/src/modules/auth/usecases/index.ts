import { CustomError, HTTP_STATUS } from "../../../shared/error";
import type { CreateUser, Session, User, UserCredential } from "../models";
import { authRepo } from "../repository";
import { getSessionExpireDate, hashPassword, verifyPassword } from "../utils";

export async function signInUseCase({
  email,
  password,
}: UserCredential): Promise<Session> {
  const user = await authRepo.getUserByEmail({ email });
  if (!user) throw new CustomError(HTTP_STATUS.UNAUTHORIZED);

  const isValid = await verifyPassword(password, user.hashedPassword);
  if (isValid) {
    return authRepo.createSession({
      userId: user.id,
      expiresAt: getSessionExpireDate(),
    });
  } else throw new CustomError(HTTP_STATUS.UNAUTHORIZED);
}

export async function signupUseCase({
  email,
  password,
  group,
}: CreateUser): Promise<Session> {
  const user = await authRepo.getUserByEmail({ email });
  if (user) throw new CustomError(HTTP_STATUS.CONFLICT);

  const hashedPassword = await hashPassword(password);
  const newUser = await authRepo.createUser({
    email,
    group,
    password: hashedPassword,
  });
  return authRepo.createSession({
    userId: newUser.id,
    expiresAt: getSessionExpireDate(),
  });
}

export async function signOutUseCase({
  sessionId,
}: {
  sessionId: Session["id"];
}): Promise<void> {
  authRepo.updateSession({ id: sessionId, expiresAt: new Date() });
}
