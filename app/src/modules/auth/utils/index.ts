import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;
const SESSION_DURATION = 1000 * 3600 * 24 * 7; // 7 day

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function getSessionExpireDate(): Date {
  return new Date(Date.now() + SESSION_DURATION);
}
