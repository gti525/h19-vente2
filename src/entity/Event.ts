import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
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

    @OneToOne(type => Venue)
    @JoinColumn()
    venue: Venue;
}