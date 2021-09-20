import Activity from "@/entities/Activity";
import faker from "faker";
import { randomIntSmallerThanValue } from "./utils/randomNumberSmallerThanValue";

export async function createActivity() {
  const activity = Activity.create({
  name: faker.name.jobTitle(),
  startTime: faker.datatype.datetime(),
  endTime: faker.datatype.datetime(),
  vacancies: randomIntSmallerThanValue(30)
  });

  await activity.save();
  return activity;
}
