import EventDay from "@/entities/EventDay";
import dayjs, { Dayjs } from "dayjs";

export async function getDays() {
  const days = await EventDay.getDays();
  
  const requestedDays: Days[] = [];
  days.forEach((day) => {
    const dayInfo = dayjs(day.date).format("dddd, DD/MM");
    delete day.date;
    requestedDays.push({ ...day, dayInfo });
  });
  
  return requestedDays;
}

export async function addNewDay(day: string) {
  
  const newDay = dayjs(day).toISOString();
  
  return await EventDay.addNewDay(newDay);

}

interface Days{
    dayInfo: string
}
  
