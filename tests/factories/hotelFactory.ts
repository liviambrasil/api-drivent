import Hotel from "@/entities/Hotel";
import faker from "faker";

import { randomIntSmallerThanValue } from "./utils/randomNumberSmallerThanValue";

export async function createHotel() {
  const hotel = Hotel.create({
    name: faker.company.companyName(),
    maxRoomOccupation: randomIntSmallerThanValue(4),
    image: faker.image.imageUrl(),
    totalRooms: randomIntSmallerThanValue(201),
  });

  await hotel.save();

  return hotel;
}
