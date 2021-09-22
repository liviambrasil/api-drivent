import Activity from "@/entities/Activity";
import faker from "faker";
import { randomIntSmallerThanValue } from "./utils/randomNumberSmallerThanValue";
import EventDay from "@/entities/EventDay";
import dayjs from "dayjs";
export async function createActivity() {
  //add the event day into database
  let date = faker.date.between("2021-12-10", "2021-12-25");
  const stringDate = dayjs(date).toISOString();  
  await EventDay.addNewDay(stringDate);

  const activity = Activity.create({
  name: faker.name.jobTitle(),
  startTime: date,
  endTime: date,
  vacancies: randomIntSmallerThanValue(30)
  });

  await activity.save();
  return activity;
}
