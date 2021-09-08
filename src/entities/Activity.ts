import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import Location from "./Location";
import ActivityUser from "./activitiesUsers";

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

  @ManyToOne(() => Location, (location: Location) => location.activities)
  location: Location;

  @OneToMany(() => ActivityUser, (activityUser) => activityUser.activity, { onDelete: "CASCADE" })
  activitiesUsers: ActivityUser[]

  // @ManyToOne(() => User, user => user.photos)
  //   user: User;

  static async getActivities() {
    console.log("chegou na database");
    const activities = await this.find({ relations: ["location"] });

    // const activities = await 
    // this.createQueryBuilder("a")
    //   .leftJoin(ActivityUser, "aU")
    //   .where("aU.userId= :id", { id: 1 })
    //   .getMany();
    
    console.log("retornou a info");
    return activities;
  }
}
