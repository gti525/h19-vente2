import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Ticket } from "../entity/Ticket";

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

let exampleTicket = <Ticket>({id: 3, guid: "asdf", price: 50, transaction: null, event: null})
let exampleCartTicket = new CartTicket(exampleTicket, 3);
let exampleCart = new Cart([exampleCartTicket], new Date());

carts.set("test", exampleCart);

export async function getCart(request: Request, response: Response) {
	response.send(carts.get("test"));
}

export async function addTicket(request: Request, response: Response) {
	response.json({"message": "Not yet done"})
}

export async function editTicket(request: Request, response: Response) {
	response.json({"message": "Not yet done"})
}

export async function removeTicket(request: Request, response: Response) {
	response.json({"message": "Not yet done"})
}