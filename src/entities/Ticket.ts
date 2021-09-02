import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("sessions")
export default class Ticket {
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
}
