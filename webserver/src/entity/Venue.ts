import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {Event} from "./Event";

@Entity()
export class Venue {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;

    @Column()
    address: string;

    @Column()
    capacity: number;

    @OneToMany(type => Event, event => event.venue)
    events: Event[];

}