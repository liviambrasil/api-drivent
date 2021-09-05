import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from "typeorm";

import Hotel from "./Hotel";
import Reservation from "./Reservation";

@Entity("rooms")
export default class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  maxOccupation: number;

  @Column()
  currentOccupation: number;

  @Column()
  hotelId: number;

  @ManyToOne(() => Hotel, (hotel: Hotel) => hotel.room)
  hotel: Hotel;

  @ManyToMany(() => Reservation, (reservation) => reservation.room)
  reservation: Reservation;

  static async list(hotelId: number) {
    const rooms = await this.find({ hotelId });
    return rooms;
  }

  static async getVacancyAmount(hotelId: number) {
    let counter = 0;

    const rooms = await this.find({ hotelId });
    rooms.forEach((r) => (counter += r.maxOccupation - r.currentOccupation));

    return counter;
  }

  static async updateCurrentOccupation(roomId: number, valueToAdd: number) {
    const room = await this.findOne({ id: roomId });

    room.currentOccupation += valueToAdd;

    room.save();
  }
}
