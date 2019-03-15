import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { User } from "./User";
import { Ticket } from "./Ticket";

@Entity()
export class Transaction {
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
    type: "date",
    nullable: false,
    name: "dateTransaction"
  })
  dateTransaction: Date;
}
