import { Event } from "./Event";
import { Transaction } from "./Transaction";

export class Ticket {

    id: number;
    guid: string;
    price: number;
    transaction: Transaction;
    event: Event;
}