import { Ticket } from './ticket';

export class CartTicket {
	ticket: Ticket;
	count: number;
}

export class Cart {
	tickets: CartTicket[];
	date: Date;
}