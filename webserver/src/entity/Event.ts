import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import {Venue} from "./Venue";

@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    title: string;

    @Column("text")
    description: string;

    @Column()
    organisation: string;

    @Column()
    artist: string;

    @Column({type:'date'})
    dateEvent: Date;

    @Column()
    image: string;

    @Column()
    saleStatue: number;

    @ManyToOne(type => Venue, venue => venue.events)
    venue: Venue;
}