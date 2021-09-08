import EventDay from "@/entities/EventDay";
import dayjs, { Dayjs } from "dayjs";
import Location from "@/entities/Location";

export async function getLocations() {
  return await Location.getLocations();
}

