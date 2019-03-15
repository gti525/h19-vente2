import { Event } from "./event";
import { Transaction } from "./transaction";

export class Ticket {

    id: number;
    uuid: string;
    price: number;
    transaction: Transaction;
    event: Event;
}