import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm";
import bcrypt from "bcrypt";
import EmailNotAvailableError from "@/errors/EmailNotAvailable";
import Ticket from "./Ticket";
import ActivityUser from "./activitiesUsers";

import Reservation from "./Reservation";

@Entity("users")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @OneToOne(() => Ticket, (ticket) => ticket.user, { eager: true })
  ticket: Ticket;

  @OneToMany(() => ActivityUser, (activityUser) => activityUser.user, { onDelete: "CASCADE" })
  activitiesUsers: ActivityUser[]

  @OneToOne(() => Reservation, (reservation) => reservation.user, {
    eager: true,
  })
  reservation: Reservation;

  static async createNew(email: string, password: string) {
    await this.validateDuplicateEmail(email);
    const hashedPassword = this.hashPassword(password);

    const newUser = this.create({ email, password: hashedPassword });
    await newUser.save();

    return newUser;
  }

  static hashPassword(password: string) {
    return bcrypt.hashSync(password, 12);
  }

  static async validateDuplicateEmail(email: string) {
    const user = await this.findOne({ email });

    if (user) {
      throw new EmailNotAvailableError(email);
    }
  }

  static async findByEmailAndPassword(email: string, password: string) {
    const user = await this.findOne({
      where: { email },
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }

    return null;
  }
}
