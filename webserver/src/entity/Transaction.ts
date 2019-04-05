import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn
} from "typeorm";
import { User } from "./User";
import { Ticket } from "./Ticket";

export enum transactionStatuses {
    VALID = 0,
    CANCELLED = 1
}

@Entity()
export class Transaction {
  static example: object = {
    transactionConfirmation: "CONFIRMATION_NUMBER",
    tickets: [
      {
        uuid: "e7c21e8d-6801-4433-aa36-b8d416978afc"
      },
      {
        uuid: "123e4567-e89b-12d3-a456-426655440000"
      }
    ],
    user: User.example
  };

  @PrimaryGeneratedColumn({
    type: "integer",
    name: "id"
  })
  id: number;

  @ManyToOne(type => User, user => user.transactions)
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(type => Ticket, ticket => ticket.transaction)
  tickets: Ticket[];

  @Column({
    type: "character varying",
    nullable: false,
    length: 255,
    name: "transactionConfirmation"
  })
  transactionConfirmation: string;

  @Column({
    type: "integer",
    nullable: false,
    name: "transactionStatus",
    default: transactionStatuses.VALID
  })
  transactionStatus: transactionStatuses  | transactionStatuses.VALID;

  @CreateDateColumn({
    type: "timestamp with time zone"
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp with time zone"
  })
  updatedAt: Date;
}
