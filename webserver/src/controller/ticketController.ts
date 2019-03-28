import { Request, Response } from "express";
import { getManager, IsNull, Any, Not } from "typeorm";
import { Ticket } from "../entity/Ticket";
import { Event } from "../entity/Event";

export async function getTicketsByEventId(request: Request, response: Response) {

    // get a ticket repository to perform operations with tickets
    const ticketRepository = getManager().getRepository(Ticket);

    //const tickets = await ticketRepository.find();

    // return loaded events
    // response.send(tickets);
}

export async function areTicketsSoldForEvent(event: Event): Promise<Boolean> {

    const ticketRepository = getManager().getRepository(Ticket);
    let areTicketsSold: Boolean = false;

    const tickets = await ticketRepository.find({
        event: event,
        transaction: Not(IsNull())
    });

    if ( tickets ) {
        areTicketsSold = true;
    }

    // console.log(tickets);

    return areTicketsSold;
}
