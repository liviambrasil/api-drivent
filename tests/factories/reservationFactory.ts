import Reservation from "@/entities/Reservation";

export async function createReservation(userId: number, roomId: number) {
  const reservation = Reservation.create({ userId, roomId });

  await reservation.save();

  return reservation;
}
