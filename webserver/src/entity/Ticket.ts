import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import {Event} from "./Event";
import {Transaction} from "./Transaction";

@Entity()
export class Ticket {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    guid: string;

    @Column()
    price: number;

    @OneToOne(type => Transaction)
    @JoinColumn({name: "transactionId"})
    transaction: Transaction;

    @ManyToOne(type => Event, event => event.tickets)
    @JoinColumn({name: "eventId"})
    event: Event;
}
