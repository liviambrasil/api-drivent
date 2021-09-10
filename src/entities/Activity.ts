import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import Location from "./Location";
import ActivityUser from "./activitiesUsers";
import EventDay from "./EventDay";

@Entity("activities")
export default class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => EventDay, (eventDay: EventDay) => eventDay.activities)
  eventDay: EventDay;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  vacancies: number;

  @ManyToOne(() => Location, (location: Location) => location.activities)
  location: Location;

  @OneToMany(() => ActivityUser, (activityUser) => activityUser.activity, { onDelete: "CASCADE" })
  activitiesUsers: ActivityUser[]

  static async getActivities() {
    const activities = await this.find({ relations: ["location"] });
  
    return activities;
  }
}
