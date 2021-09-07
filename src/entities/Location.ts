import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import Activity from "./Activity";

@Entity("locations")
export default class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Activity, (activity) => activity.location)
  activity: Activity

  // @OneToOne(() => Address, (address) => address.enrollment, { eager: true })
  // address: Address;
}
