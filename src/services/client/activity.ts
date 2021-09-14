
import Activity from "@/entities/Activity";
import EventDay from "@/entities/EventDay";
import dayjs from "dayjs";
export async function getActivities() {
  console.log("chegou no service activity");
  const activities = await Activity.getActivities();

  console.log(activities, "antiga");
  const ActivitiesRightTime: Times[] = [];

  activities.forEach((e) => {
    const start = dayjs(e.startTime).format("dddd DD/MM, YYYY hh:mm ");
    delete e.startTime;
    const end = dayjs(e.endTime).format("dddd DD/MM, YYYY hh:mm ");
    delete e.endTime;
    ActivitiesRightTime.push({ ...e, start, end });
  });

  console.log(activities, "activities", ActivitiesRightTime, "requestedDays");
  return ActivitiesRightTime;
}

export async function getDayActivities() {
  //return await Activity.getActivities();
}

interface Times{
    start: string
    end: string
}
