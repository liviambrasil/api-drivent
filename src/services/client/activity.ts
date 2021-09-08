import Activity from "@/entities/Activity";
import dayjs from "dayjs";

export async function getActivities() {
  console.log("chegou no service");
  const activities = await Activity.getActivities();
  console.log(activities);
  const date=activities[0].date;
  // const newDate = dayjs(date).format("dddd, DD/MM");

  const filteredData: FilteredData[] = [];

  activities.forEach((item) => {
    const newDate = dayjs(item.date).format("dddd, DD/MM");
    delete item.date;
    filteredData.push({ ...item, newDate });
  });
  
  return filteredData;
}

interface FilteredData {
  
  newDate: string
}

