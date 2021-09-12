
import Activity from "@/entities/Activity";

export async function getActivities() {
  console.log("chegou no service activity");
  const activities = await Activity.getActivities();
  console.log(activities);
  return activities;
}

export async function getDayActivities() {
  //return await Activity.getActivities();
}

