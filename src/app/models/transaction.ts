import {User} from "./user"

export class Transaction {

    id: number;
    transactionConfirmation: string;
    dateTransaction: Date;
    user: User;
}