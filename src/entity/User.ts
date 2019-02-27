import {Entity, Column, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    @Unique()
    socialLink: string;

}