import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { Event } from "./Event";
import { Transaction } from "./Transaction";

@Entity()
export class Ticket {
  static example: object = {
    uuid: "123e4567-e89b-12d3-a456-426655440000",
    price: 32.5
  };

  static exampleWithArray: object = [
    {
    uuid: "e7c21e8d-6801-4433-aa36-b8d416978afc",
    price: 17.5
    },
    {
      uuid: "123e4567-e89b-12d3-a456-426655440000",
      price: 32.5
    }];

  constructor() {}

  @PrimaryGeneratedColumn({
    type: "integer",
    name: "id"
  })
  id: number;

  @ManyToOne(() => Transaction, transaction => transaction.tickets)
  @JoinColumn({ name: "transactionId" })
  transaction: Transaction;

  @ManyToOne(() => Event, event => event.tickets)
  @JoinColumn({ name: "eventId" })
  event: Event;

  @Column({
    type: "uuid",
    unique: true,
    nullable: false,
    name: "uuid"
  })
  uuid: string;
  // UUID type maybe?

  @Column({
    type: "numeric",
    nullable: false,
    scale: 2,
    name: "price"
  })
  price: number;
}
