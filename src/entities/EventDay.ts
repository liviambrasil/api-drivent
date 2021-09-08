import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm";
import bcrypt from "bcrypt";
import EmailNotAvailableError from "@/errors/EmailNotAvailable";
import Ticket from "./Ticket";
import ActivityUser from "./activitiesUsers";
import Activity from "./Activity";

@Entity("eventDays")
export default class EventDay extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @OneToMany(() => Activity, (activity) => activity.eventDay, { onDelete: "CASCADE" })
  activities: Activity[]

  static async getDays() {
    return await this.find();
  }

  static async addNewDay(day: string) {
    const newDay = {
      date: day
    };
    if(await this.insert(newDay)) {
      return true;
    }else{
      return false;
    }
  }
}

