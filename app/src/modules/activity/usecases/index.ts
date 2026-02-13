import { ActivityWithOrganizer, GetActivityQuery } from "../models";
import { activityRepo } from "../repository";

export async function getActivitiesUseCase(
  query: GetActivityQuery
): Promise<ActivityWithOrganizer[]> {
  return activityRepo.getActivities(query);
}
