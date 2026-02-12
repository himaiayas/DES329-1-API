import { CustomError, HTTP_STATUS } from "../../../shared/error";
import {
  CreateUserActivity,
  UpdateUserActivity,
  UserActivity,
} from "../models";
import { userActivityRepo } from "../repository";

export async function userGetActivitiesUseCase({
  userId,
}: {
  userId: UserActivity["organizerId"];
}): Promise<UserActivity[]> {
  return userActivityRepo.getByUser({ userId });
}

export async function userCreateActivityUseCase({
  data,
  userId,
}: {
  data: CreateUserActivity;
  userId: UserActivity["organizerId"];
}): Promise<UserActivity> {
  return userActivityRepo.createActivity({ data, userId });
}

export async function userUpdateActivityUseCase({
  data,
  userId,
  id,
}: {
  data: UpdateUserActivity;
  userId: UserActivity["organizerId"];
  id: UserActivity["id"];
}): Promise<UserActivity> {
  return userActivityRepo.updateActivity({ data, userId, id });
}

export async function userDeleteActivityUseCase({
  id,
  userId,
}: {
  id: UserActivity["id"];
  userId: UserActivity["organizerId"];
}): Promise<void> {
  const { rowCount } = await userActivityRepo.deleteActivity({ id, userId });
  if (!rowCount || rowCount === 0) throw new CustomError(HTTP_STATUS.NOT_FOUND);
}
// We will refactor into files within this folder if it is too long
