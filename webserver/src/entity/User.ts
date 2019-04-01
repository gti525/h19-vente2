import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from "typeorm";
import { Transaction } from "./Transaction";

@Entity()
export class User {
  static example: object = {
    name: "Bod Fido",
    surname: "GOD_EHT",
    socialLink: "SOCIALLINK"
  };

  @PrimaryGeneratedColumn({
    type: "integer",
    name: "id"
  })
  id: number;

  @OneToMany(type => Transaction, transaction => transaction.user)
  transactions: Transaction[];

  @Column({
    type: "character varying",
    nullable: false,
    length: 255,
    name: "name"
  })
  name: string;

  @Column({
    type: "character varying",
    nullable: false,
    length: 255,
    name: "surname"
  })
  surname: string;

  @Column({
    type: "character varying",
    nullable: true,
    unique: true,
    name: "socialLink"
  })
  socialLink: string | null;
}
