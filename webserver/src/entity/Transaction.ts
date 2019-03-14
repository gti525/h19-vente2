import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
import {User} from "./User"

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    transactionConfirmation: string;

    @Column({type:'date'})
    dateTransaction: Date;

    @OneToOne(type => User)
    @JoinColumn({name: "userId"})
    user: User;
}
