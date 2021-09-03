import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";

import Room from "./Room";

@Entity("hotels")
export default class Hotel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  maxRoomOccupation: number;

  @Column()
  image: string;

  @Column()
  totalRooms: number;

  @OneToMany(() => Room, (room: Room) => room.hotel)
  room: Room[];

  static async getAll() {
    return this.find();
  }
}
