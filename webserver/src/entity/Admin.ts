import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Admin {
  public static example: object = {
    username: "teh_admin",
    password: "whatever"
  };

  @PrimaryGeneratedColumn({
    type: "integer",
    name: "id"
  })
  id: number;

  @Column({
    type: "character varying",
    nullable: false,
    unique: true,
    length: 100,
    name: "username"
  })
  username: string;

  @Column({
    type: "character varying",
    nullable: false,
    unique: true,
    length: 255,
    name: "hashedPassword"
  })
  hashedPassword: string;

  @Column({
    type: "character varying",
    nullable: false,
    length: 255,
    name: "salt"
  })
  salt: string;
}
