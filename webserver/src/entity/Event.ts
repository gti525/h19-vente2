import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from "typeorm";
import { Venue } from "./Venue";
import { Ticket } from "./Ticket";

@Entity()
export class Event {
  public static example: object = {
    title: "Roméo et Juliette",
    description: "Description détaillée qui sera affichée sur la page du spectacle.",
    artist: "William Shakespeare",
    date: "2019-06-15T20:30:00.001Z",
    venue: {
      name: "Centre Bell",
      address: "1909, Avenue des Canadiens-de-Montréal, Montréal, QC, H4B 5G0",
      capacity: 21273
    }
  };

  public static exampleWithTickets: object = {
    title: "Roméo et Juliette",
    description: "Description détaillée qui sera affichée sur la page du spectacle.",
    artist: "William Shakespeare",
    date: "2019-06-15T20:30:00.001Z",
    venue: {
      name: "Centre Bell",
      address: "1909, Avenue des Canadiens-de-Montréal, Montréal, QC, H4B 5G0",
      capacity: 21273
    },
    tickets: [
      {
        uuid: "e7c21e8d-6801-4433-aa36-b8d416978afc",
        price: 40.25
      },
      {
        uuid: "123e4567-e89b-12d3-a456-426655440000",
        price: 32.5
      }
    ]
  };

  @PrimaryGeneratedColumn({
    type: "integer",
    name: "id"
  })
  id: number;

  @ManyToOne(type => Venue, venue => venue.events)
  @JoinColumn({ name: "venueId" })
  venue: Venue;

  @OneToMany(type => Ticket, ticket => ticket.event)
  tickets: Ticket;

  @Column({
    type: "character varying",
    nullable: false,
    length: 100,
    name: "title"
  })
  title: string;

  @Column({
    type: "text",
    nullable: false,
    name: "description"
  })
  description: string;

  @Column({
    type: "character varying",
    nullable: true,
    length: 255,
    name: "organisation"
  })
  organisation: string | null;

  @Column({
    type: "character varying",
    nullable: false,
    length: 255,
    name: "artist"
  })
  artist: string;

  @Column({
    type: "timestamp with time zone",
    nullable: false,
    name: "dateEvent"
  })
  dateEvent: Date;

  @Column({
    type: "character varying",
    nullable: false,
    length: 255,
    name: "image"
  })
  image: string;

  @Column({
    type: "integer",
    nullable: false,
    name: "saleStatus"
  })
  saleStatus: number;
  // 0 = Not on sale (Newly uploaded event)
  // 1 = Currently on sale and shown on website (needs valid tickets)
  // 2 = Not on sale (tickets have been sold) - Event should be frozen from modifications
}
