import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import {Venue} from "./Venue";

@Entity()
export class Event {

  static example: object = {
    message: "La syntaxe du corps de la requête ne respecte pas ce qui est attendu.",
    example: {
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
          uuid: "123e4567-e89b-12d3-a456-426655440000",
          price: 32.5
        }
      ]
    }
  };

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
  // Typo
  // 0 = Not on sale (Newly uploaded event)
  // 1 = Currently on sale and shown on website (needs valid tickets)

  @ManyToOne(type => Venue, venue => venue.events)
  venue: Venue;
}
