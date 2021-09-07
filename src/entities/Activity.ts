import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Location from "./Location";

@Entity("activities")
export default class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  vacancies: number;

  @OneToOne(() => Location, (location: Location) => location.activity)
  @JoinColumn()
  location: Location;

//   @OneToOne(() => Enrollment, (enrollment: Enrollment) => enrollment.address)
//   @JoinColumn()
//   enrollment: Enrollment;
}
