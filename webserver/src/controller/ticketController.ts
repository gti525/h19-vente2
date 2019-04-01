import { Request, Response } from "express";
import { getManager, IsNull, Any, Not, In } from "typeorm";
import { Ticket } from "../entity/Ticket";
import { Event } from "../entity/Event";
import { tick } from "@angular/core/src/render3";
import { anyNonNil } from "is-uuid";

export async function getTicketsByEventId(request: Request, response: Response) {

    // get a ticket repository to perform operations with tickets
    const ticketRepository = getManager().getRepository(Ticket);

    // const tickets = await ticketRepository.find();

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

export async function verifyTicketsFromArray(tickets: Ticket[]): Promise<Ticket[]> {

    const ticketRepository = getManager().getRepository(Ticket);
    const ticketsResponse = await ticketRepository.find({
        where: tickets.map(thicket => ({uuid: thicket.uuid})),
        relations: ["event"]
    });

    if (ticketsResponse.length !== 0) {
        for (const ticket of ticketsResponse) {
            delete ticket.event.title;
            delete ticket.event.description;
            delete ticket.event.organisation;
            delete ticket.event.artist;
            delete ticket.event.dateEvent;
            delete ticket.event.image;
            delete ticket.event.saleStatus;
        }
    }
    // console.log(ticketsResponse);

    return ticketsResponse;
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

export async function getTicketsByUuidArray(tickets: Ticket[]): Promise<Ticket[]> {
    const ticketRepository = getManager().getRepository(Ticket);

    const uuids = new Array<string>();
    for (const ticket of tickets) {
        if (!anyNonNil(ticket.uuid)) {
            console.log(`getTicketsByUuidArray(): Invalid uuid: ${ticket.uuid}`);
            return [];
        }
        uuids.push(ticket.uuid);
    }
    // console.log(uuids);
    const dbTickets = await ticketRepository.find({
        where: {
            uuid: In(uuids),
            transaction: IsNull()
        }
    });
    if (dbTickets.length !== uuids.length) {
        console.log(`Database only found ${dbTickets.length} matches, while the request had ${uuids.length}.`);
        tickets = [];
    }
    tickets = dbTickets;

    return tickets;
}

