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

export async function getTicketsForEvent(event: Event): Promise<Ticket[]> {

    const ticketRepository = getManager().getRepository(Ticket);
    const tickets = await ticketRepository.find({
        event: event
    });

    // console.log(tickets);

    return tickets;
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

export async function deleteTicketsForEvent(event: Event): Promise<number> {
    const ticketRepository = getManager().getRepository(Ticket);
    const soldTickets = await getSoldTicketsForEvent(event);
    const freeTickets = await getFreeTicketsForEvent(event);

    // 0 means successfully deleted tickets
    // 1 means cannot delete, some tickets are sold
    // 2 means cannot delete, no tickets where found
    let result: number;

    // No tickets sold
    if (soldTickets.length === 0) {
        // No free tickets (no tickets at all)
        if (freeTickets.length === 0) {
            result = 2;
        } else {
            result = 0;
            const temp = await ticketRepository.remove(freeTickets);
            // console.log(temp);
        }
    } else {
        result = 1;
    }

    return result;
}

