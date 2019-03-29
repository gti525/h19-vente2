import { Ticket } from './ticket';

export class CartTicket {
	ticket: Ticket;
	count: number;
}

export class ShowCart {
	tickets: CartTicket[];
}

export class Cart {
	tickets: Ticket[];
	date: Date;
}