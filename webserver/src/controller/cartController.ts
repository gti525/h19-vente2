import { Request, Response } from "express";
//import { getManager } from "typeorm";
import { Ticket } from "../entity/Ticket";
import { Event } from "../entity/Event";

class CartTicket {
	ticket: Ticket;
	count: number;

	constructor(ticket: Ticket, count: number) {
		this.ticket = ticket;
		this.count = count;
	}
}

class Cart {
	tickets: CartTicket[];
	date: Date;

	constructor(tickets: CartTicket[], date: Date) {
		this.tickets = tickets;
		this.date = date;
	}
}

let carts = new Map();

/*let exampleTicket = <Ticket>({id: 3, guid: "asdf", price: 50, transaction: null, event: null})
let exampleCartTicket = new CartTicket(exampleTicket, 3);
let exampleCart = new Cart([exampleCartTicket], new Date());

carts.set("test", exampleCart);

export async function getCart(request: Request, response: Response) {
	response.send(carts.get("test"));
}*/

export async function getCart(request: Request, response: Response) {
	if (carts.has(request.ip)) {
		response.send(carts.get(request.ip));
	} else {
		response.json({"error": 0, "description": "cart is empty"})
	}
}

export async function addTicket(request: Request, response: Response) {
	let ticket = new Ticket();
	let event = new Event();
	let cart: Cart;
	let totalCount = 0;

	event.id = request.body.id;
	event.title = request.body.title;
	event.description = request.body.description;
	event.organisation = request.body.organisation;
	event.artist = request.body.artist;
	event.dateEvent = new Date(request.body.dateEvent);
	event.saleStatus = request.body.saleStatus;
	event.venue = null;

	ticket.id = Math.random() * 1_000_000_000_000;
	ticket.transaction = null;
	ticket.event = event;
	ticket.uuid = "random-temp";
	ticket.price = 50;

	if (carts.has(request.ip)) {
		cart = carts.get(request.ip);
	} else {
		cart = new Cart([], new Date());
		carts.set(request.ip, cart);
	}

	for (let i = 0; i < cart.tickets.length; i++) {
		totalCount += cart.tickets[i].count;
	}

	if (totalCount < 6) {
		let cartTicket = new CartTicket(ticket, 1);
		cart.tickets.push(cartTicket);
		response.send(cartTicket);
	} else {
		response.json({"error": 1, "description": "Cart is full."});
	}
}

export async function editTicket(request: Request, response: Response) {
	let id = request.body.ticket.id;
	let count = request.body.count;
	let cartTicket: CartTicket;
	let cart = carts.get(request.ip);
	let totalCount = 0;

	for (let i = 0; i < cart.tickets.length; i++) {
		totalCount += cart.tickets[i].count;
		if (cart.tickets[i].ticket.id == id) {
			cartTicket = cart.tickets[i].ticket;
		}
	}

	let newCount = totalCount + count - cartTicket.count;

	if (newCount > 6) {
		response.json({"error": 2, "description": "Maximum number of tickets reached"});
	} else if (count == 0) {
		response.json({"error": 3, "description": "Can't change to 0, use delete instead"})
	} else {
		cartTicket.count = count;
		response.send(cartTicket);
	}
}

export async function removeTicket(request: Request, response: Response) {
	let id = request.body.ticket.id;
	let cart = carts.get(request.ip);
	let index: number;

	if (cart.tickets.length == 1) {
		carts.delete(request.ip);
		response.json({"error": 4, "description": "Last ticket deleted. Cart is now empty."})
	} else {
		for (let i = 0; i < cart.tickets.length; i++) {
			if (cart.tickets[i].ticket.id == id) {
				index = i;
				break;
			}
		}

		cart.tickets.splice(index, 1);
		response.send(cart);
	}
}