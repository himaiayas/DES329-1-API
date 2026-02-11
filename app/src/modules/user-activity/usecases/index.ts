import { UserActivity } from "../models";
import { userActivityRepo } from "../repository";

export async function userGetActivities({
  userId,
}: {
  userId: UserActivity["organizerId"];
}): Promise<UserActivity[]> {
  return userActivityRepo.getByUser({ userId });
}

// We will refactor into files within this folder if it is too long
