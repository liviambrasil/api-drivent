import ActivityUser from "@/entities/activitiesUsers";
import Activity from "@/entities/Activity";
import EventDay from "@/entities/EventDay";
import dayjs from "dayjs";
import { idText, isIfStatement } from "typescript";
export async function getActivities() {
  const activities = await Activity.getActivities();

  const ActivitiesRightTime: Times[] = [];

  activities.forEach((e) => {
    const start = dayjs(e.startTime).format("dddd DD/MM, YYYY hh:mm ");
    delete e.startTime;
    const end = dayjs(e.endTime).format("dddd DD/MM, YYYY hh:mm ");
    delete e.endTime;
    ActivitiesRightTime.push({ ...e, start, end });
  });

  return ActivitiesRightTime;
}

export async function getDayActivities() {
  //return await Activity.getActivities();
}

interface Times {
  start: string;
  end: string;
}

export async function getActivitiesByUserId(userId: number) {
  const userActivities = await ActivityUser.find({ userId });

  userActivities.forEach((ua) => {
    delete ua.id;
    delete ua.userId;
  });

  return userActivities;
}

export async function saveUserActivity(userId: number, activityId: number) {
  const newActivity = await Activity.findOne({ id: activityId });

  const activityDuration = dayjs(newActivity.endTime).diff(
    newActivity.startTime,
    "s"
  );

  const userActivities = await ActivityUser.find({
    where: { userId },
    relations: ["activity"],
  });

  const result = {} as { error: string };

  if (!newActivity) result.error = "invalidId";

  userActivities.forEach(({ activity }) => {
    if (activity.id === newActivity.id) {
      result.error = "conflict";
    }

    if (dayjs(newActivity.endTime).diff(activity.startTime) < 0) {
      result.error = "conflict";
    }

    if (dayjs(activity.endTime).diff(newActivity.startTime) < 0) {
      result.error = "conflict";
    }
  });

  if (!result.error) {
    const activityUser = ActivityUser.create({ userId, activityId });
    await activityUser.save();

    newActivity.vacancies--;
    await newActivity.save();
  }

  return result;
}
