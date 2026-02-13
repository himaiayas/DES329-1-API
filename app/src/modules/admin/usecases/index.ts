import { adminRepo } from "../repository";
import { UpdateUser, User } from "../models";
import { CustomError, HTTP_STATUS } from "../../../shared/error";

export async function adminGetUsersUseCase(): Promise<User[]> {
  const allUsers = await adminRepo.getUsers();
  return allUsers;
}

export async function adminDeleteUserUseCase({
  userId,
}: {
  userId: User["id"];
}): Promise<void> {
  const { rowCount } = await adminRepo.deleteUser({ userId });
  if (!rowCount || rowCount === 0) throw new CustomError(HTTP_STATUS.NOT_FOUND);
}

export async function adminUpdateUserUseCase({
  userId,
  data,
}: {
  userId: User["id"];
  data: UpdateUser;
}): Promise<User> {
  return adminRepo.updateUser({ data, userId });
}
