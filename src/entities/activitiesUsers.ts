import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Activity from "./Activity";

import User from "./User";

@Entity("activitiesUsers")
export default class ActivityUser {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column()
    activityId: number

    @ManyToOne(() => User, (user) => user.activitiesUsers)
    user: User

    @ManyToOne(() => Activity, (activity) => activity.activitiesUsers)
    activity: Activity
}
