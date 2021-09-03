import Hotel from "@/entities/Hotel";
import Room from "@/entities/Room";

interface HotelInfo {
  id: number;
  name: string;
  maxRoomOccupation: number;
  image: string;
  totalRooms: number;
  availableRooms: number;
}

export async function getAll() {
  const hotels = await Hotel.getAll();
  const result: HotelInfo[] = [];

  for (let i = 0; i < hotels.length; i++) {
    const availableRooms = await Room.getVacancyAmount(hotels[i].id);
    result.push({ ...hotels[i], availableRooms });
  }

  return result;
}
