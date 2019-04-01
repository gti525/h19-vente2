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

	calculateTotal() {
		var total = 0;
		if (this.tickets) {
			this.tickets.forEach(function (ticket) {
				total += Number(ticket.price);
			})
		}

		return total;
	}
}