import Session from "@/entities/Room";
import Room from "@/entities/Room";
import { randomIntSmallerThanValue } from "./utils/randomNumberSmallerThanValue";

export async function createRoom(hotelId: number) {
  const room = Room.create({
    number: `${randomIntSmallerThanValue(100)}`,
    maxOccupation: randomIntSmallerThanValue(4),
    currentOccupation: randomIntSmallerThanValue(4),
    hotelId: hotelId,
  });

  await Room.save(room);

  return room;
}
