import { Request, Response } from "express";
import { getManager, IsNull, Any, Not } from "typeorm";
import { Ticket } from "../entity/Ticket";
import { Event } from "../entity/Event";
import { async } from "@angular/core/testing";

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

export async function getSoldTicketsForEvent(event: Event): Promise<Ticket[]> {

    const ticketRepository = getManager().getRepository(Ticket);
    const tickets = await ticketRepository.find({
        event: event,
        transaction: Not(IsNull())
    });

    return tickets;
}

export async function getFreeTicketsForEvent(event: Event): Promise<Ticket[]> {

    const ticketRepository = getManager().getRepository(Ticket);
    const tickets = await ticketRepository.find({
        event: event,
        transaction: IsNull()
    });

    return tickets;
}

