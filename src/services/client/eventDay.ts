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
  console.log(days);

  //days={...days,newDate:dayjs(days)}

  return requestedDays;
}

export async function addNewDay(day: string) {
  console.log(day);
  //const newDay = 
  const newDay = dayjs(day).toISOString();
  
  console.log(newDay);
  
  return await EventDay.addNewDay(newDay);
  
  //const days = await EventDay.getDays();
  
  // return days;
}

interface Days{
    dayInfo: string
}
  
