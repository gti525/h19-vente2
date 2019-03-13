import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Ticket } from "../entity/Ticket";

export async function getTicketsByEventId(request: Request, response: Response) {

    // get a ticket repository to perform operations with tickets
    const ticketRepository = getManager().getRepository(Ticket);

    //const tickets = await ticketRepository.find();

    // return loaded events
    // response.send(tickets);
}