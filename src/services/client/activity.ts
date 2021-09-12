
export async function getActivities() {
  console.log("chegou no service activity");
  const activities = await Activity.getActivities();
  return activities;
}

export async function getDayActivities() {
  return await Activity.getActivities();
}

interface FilteredData {
  newDate: string
}

