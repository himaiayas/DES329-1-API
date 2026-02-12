import { UserActivity } from "../models";
import { activityRepo } from "../repository";

export async function getActivitiesUseCase(query) {
  return activityRepo.getEvents(query);
}

