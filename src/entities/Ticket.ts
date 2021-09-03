import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

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

    static async saveTicket(ticket: Ticket) {
      const newTicket = this.create(ticket);
      await this.save(newTicket);
    }
}
