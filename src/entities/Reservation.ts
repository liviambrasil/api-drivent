import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm";

import User from "./User";
import Room from "./Room";

@Entity("reservations")
export default class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  roomId: number;

  @OneToOne(() => User, (user: User) => user.reservation)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Room, (room: Room) => room.reservation)
  @JoinColumn()
  room: Room;

  static async saveNew(userId: number, roomId: number) {
    const newReservation = this.create({ userId, roomId });
    await this.save(newReservation);
  }

  static async getByUserId(userId: number) {
    return await this.findOne({ userId });
  }

  static async deleteByUserId(userId: number) {
    await this.delete({ userId });
  }
}
