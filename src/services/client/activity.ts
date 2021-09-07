import Activity from "@/entities/Activity";

export async function getActivities() {
  console.log("chegou no service");
  return await Activity.getActivities();
}
