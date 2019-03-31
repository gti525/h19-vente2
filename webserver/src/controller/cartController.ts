import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Ticket } from "../entity/Ticket";
import { Event } from "../entity/Event";
import uuid = require("uuid");

class Cart {
	tickets: Ticket[];
	date: Date;

	constructor(date: Date) {
		this.tickets = [];
		this.date = date;
	}
}

let carts = new Map();
let ticketsInCart = [];
let cartExpirationDelay = 1200; // Seconds
//let cartExpirationDelay = 10; // To test

export async function getCart(request: Request, response: Response) {
	cleanup();

	if (carts.has(request.session.id)) {
		response.send(carts.get(request.session.id));
	} else {
		response.json({"error": 0, "description": "Cart is empty."})
	}
}

async function getRemainingTickets(eventId) {
	let remainingTickets = [];

	// Check if there's tickets remaining
	const ticketRepository = getManager().getRepository(Ticket);

	const tickets = await ticketRepository
    .createQueryBuilder("ticket")
    .innerJoinAndSelect("ticket.event", "event")
    .where("ticket.transaction is null AND ticket.event.id = :id", { id: eventId })
    .getMany();

  if (tickets) {
  	for (let i = 0; i < tickets.length; i++) {
  		if (!ticketsInCart.includes(tickets[i].id)) {
  			remainingTickets.push(tickets[i]);
  		}
  	}
  }

  return remainingTickets;
}

export async function addTicket(request: Request, response: Response) {
	cleanup();

	let addTicket = false;
	let cart: Cart;
	let eventId = request.body.id;

	// Check if ticket already in cart
	if (carts.has(request.session.id)) {
		cart = carts.get(request.session.id);

		if (cart.tickets.length == 6) {
			response.json({"error": 1, "description": "Cart is full."})
			return
		}

		for (let i = 0; i < cart.tickets.length; i++) {
			if (cart.tickets[i].event.id == eventId) {
				response.json({"error": 2, "description": "Ticket already in cart."});
				return;
			}
		}
	}

	// Check if there's tickets remaining
	getRemainingTickets(eventId).then(function(tickets) {
		if (tickets.length > 0) {
			if (!carts.has(request.session.id)) {
				cart = new Cart(new Date());
				carts.set(request.session.id, cart);
			}

			cart.tickets.push(tickets[0]);
			ticketsInCart.push(tickets[0].id);
			response.send(tickets[0]);
		} else {
			response.json({"error": 3, "description": "No more tickets for this event."});
		}
	});
}

export async function editTicket(request: Request, response: Response) {
	cleanup();

	if (carts.has(request.session.id)) {
		let cart: Cart = carts.get(request.session.id);

		if (request.body.add) {
			if (cart.tickets.length == 6) {
				response.json({"error": 1, "description": "Cart is full."});
			} else {
				getRemainingTickets(request.body.event.id).then(function(tickets) {
					if (tickets.length > 0) {
						cart.tickets.push(tickets[0]);
						ticketsInCart.push(tickets[0].id);
						response.send(cart);
					} else {
						response.json({"error": 3, "description": "No more tickets for this event."});
					}
				});
			}
		} else {
			let indexTickets = 0;
			let indexTicketIds = 0;

			for (let i = 0; i < cart.tickets.length; i++) {
				if (cart.tickets[i].id == request.body.id) {
					indexTickets = i;
					break;
				}
			}

			for (let i = 0; i < ticketsInCart.length; i++) {
				if (ticketsInCart[i] == request.body.id) {
					indexTicketIds = i;
					break;
				}
			}

			cart.tickets.splice(indexTickets, 1);
			ticketsInCart.splice(indexTicketIds, 1);

			if (cart.tickets.length == 0) {
				carts.delete(request.session.id);
			}

			response.send(cart);
		}
	} else {
		response.json({"error": 4, "description": "Cart expired."});
	}
}

export async function removeTicket(request: Request, response: Response) {
	cleanup();

	if (carts.has(request.session.id)) {
		let id = request.params.ticketId;
		let cart = carts.get(request.session.id);
		let indices = [];
		let ids = [];
		let indicesIds = [];
		let eventId: number;

		// Get event id
		for (let i = 0; i < cart.tickets.length; i++) {
			if (cart.tickets[i].id == id) {
				eventId = cart.tickets[i].event.id;
				break;
			}
		}

		// Get indices and ids of tickets to remove
		for (let i = 0; i < cart.tickets.length; i++) {
			if (cart.tickets[i].event.id == eventId) {
				indices.push(i);
				ids.push(cart.tickets[i].id);
			}
		}

		// Remove tickets
		for (let i = indices.length - 1; i >= 0; i--) {
			cart.tickets.splice(indices[i], 1);
		}

		// Get indices of ids in cart
		for (let i = 0; i < ticketsInCart.length; i++) {
			if (ids.includes(ticketsInCart[i])) {
				indicesIds.push(i);
			}
		}

		// Remove ids
		for (let i = indicesIds.length - 1; i >= 0; i--) {
			ticketsInCart.splice(indicesIds[i], 1);
		}

		if (cart.tickets.length == 0) {
			carts.delete(request.session.id);
		}

		response.send(cart);
	} else {
		response.json({"error": 4, "description": "Cart expired."});
	}
}

export async function cartExpire(request: Request, response: Response) {
	removeCart(request.session.id);
	response.json({"success": 0, "description": "Cart was removed."});
}

export function removeCart(id: number) {
	if (carts.has(id)) {
		let ticketsToDelete = []
		let indicesTicketsToDelete = []
		let cart = carts.get(id);

		// Get tickets ids to remove
		for (let i = 0; i < cart.tickets.length; i++) {
			ticketsToDelete.push(cart.tickets[i].id);
		}

		// Get indices of ids in cart
		for (let i = 0; i < ticketsInCart.length; i++) {
			if (ticketsToDelete.includes(ticketsInCart[i])) {
				indicesTicketsToDelete.push(i);
			}
		}

		// Remove ids
		for (let i = indicesTicketsToDelete.length - 1; i >= 0; i--) {
			ticketsInCart.splice(indicesTicketsToDelete[i], 1);
		}

		// Remove cart
		carts.delete(id);
	}
}

export async function getRemainingTime(request: Request, response: Response) {
	if (carts.has(request.session.id)) {
		let timeDiff = Math.abs((new Date()).getTime() - carts.get(request.session.id).date.getTime());
		let diffSeconds = Math.ceil(timeDiff / 1000);

		if (cartExpirationDelay - diffSeconds > 0) {
			response.json({"remainingTime": cartExpirationDelay - diffSeconds});
		} else {
			cleanup();
			response.json({"error": 4, "description": "Cart expired."});
		}
	} else {
		response.json({"error": 4, "description": "Cart expired."});
	}
}

export function cleanup() {
	let cartsToDelete = []
	let ticketsToDelete = []
	let indicesTicketsToDelete = []

	// Check which cart needs to be deleted
	carts.forEach(function(value, key, map) {
		let timeDiff = Math.abs((new Date()).getTime() - value.date.getTime());
		let diffSeconds = Math.ceil(timeDiff / 1000);

		if (diffSeconds > cartExpirationDelay) {
			cartsToDelete.push(key);

			for (let i = 0; i < value.tickets.length; i++) {
				ticketsToDelete.push(value.tickets[i].id);
			}
		}
	});

	// Get indices of ids in cart
	for (let i = 0; i < ticketsInCart.length; i++) {
		if (ticketsToDelete.includes(ticketsInCart[i])) {
			indicesTicketsToDelete.push(i);
		}
	}

	// Remove ids
	for (let i = indicesTicketsToDelete.length - 1; i >= 0; i--) {
		ticketsInCart.splice(indicesTicketsToDelete[i], 1);
	}

	// Remove carts
	for (let i = 0; i < cartsToDelete.length; i++) {
		carts.delete(cartsToDelete[i]);
	}
}