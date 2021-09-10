import TicketData from "@/interfaces/ticket";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import User from "./User";

@Entity("ticket")
export default class Ticket extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    isPresential: boolean;

    @Column()
    isHotel: boolean;

    @Column()
    isPaid: boolean;

    @OneToOne(() => User, (user: User) => user.ticket)
      @JoinColumn()
      user: User;

    static async saveTicket(ticket: TicketData) {
      const newTicket = this.create(ticket);
      await this.save(newTicket);
    }

    static async findById(id: number) {
      const ticket = await this.findOne({ userId: id });
      return ticket;
    }
}
