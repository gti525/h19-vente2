import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
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
    @JoinColumn()
    transaction: Transaction;

    @OneToOne(type => Event)
    @JoinColumn()
    event: Event;
}