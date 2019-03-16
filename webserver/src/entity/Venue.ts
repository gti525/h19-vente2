import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Event } from "./Event";

@Entity()
export class Venue {
  public static example: object = {
    name: "Centre Bell",
    address: "1909, Avenue des Canadiens-de-Montréal, Montréal, QC, H4B 5G0",
    capacity: 21273
  };

  @PrimaryGeneratedColumn({
    type: "integer",
    name: "id"
  })
  id: number;

  @OneToMany(type => Event, event => event.venue)
  events: Event[];

  @Column({
    type: "character varying",
    nullable: false,
    length: 100,
    name: "name"
  })
  name: string;

  @Column({
    type: "character varying",
    nullable: false,
    length: 255,
    name: "address"
  })
  address: string;

  @Column({
    type: "integer",
    nullable: false,
    name: "capacity"
  })
  capacity: number;
}
