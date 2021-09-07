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

  static async getActivities() {
    console.log("chegou na database");
    const activities = await this.find();
    console.log("retornou a info");
    return activities;
  }
}
