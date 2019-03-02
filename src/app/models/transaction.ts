import {User} from "./User"

export class Transaction {

    id: number;
    transactionConfirmation: string;
    dateTransaction: Date;
    user: User;
}