import { Event } from "./event";
import { Transaction } from "./transaction";

export class Ticket {

    id: number;
    guid: string;
    price: number;
    transaction: Transaction;
    event: Event;
}