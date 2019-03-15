import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Event } from "../entity/Event";
import { Venue } from "../entity/Venue";
import { isNumber, isString, isArray, isNullOrUndefined } from "util";
import { Ticket } from "../entity/Ticket";
import { anyNonNil } from "is-uuid";
import { checkDuplicateInObject } from "../lib/tools";
import "is-url";
import isUrl = require("is-url");

/**
 * Loads all events from the database.
 */
export async function getAllEvents(request: Request, response: Response) {

    // get a event repository to perform operations with event
    const eventRepository = getManager().getRepository(Event);

    // load a event by a given event id
    const events = await eventRepository.find();

    // return loaded events
    response.send(events);
}

/**
 * Loads one event from the database
 */
export async function getEventById(request: Request, response: Response) {

    // get a event repository to perform operations with event
    const eventRepository = getManager().getRepository(Event);

    // load a event by a given event id and its associated venues
    const event = await eventRepository
        .createQueryBuilder("event")
        .innerJoinAndSelect("event.venue", "venue")
        .where("event.id = :myid", {myid: request.params.eventId })
        .getOne();


    // if event was not found return 404 to the client
    if (!event) {
        response.status(404);
        response.end();
        return;
    }

    // return loaded event
    response.send(event);
}

/**
 * Submit one event to the database
 */
export async function addEvent(request: Request, response: Response) {

    // Assign entity variables
    const venue = new Venue();
    const event = new Event();
    const tickets = new Array<Ticket>();

    // TODO: 401 UNAUTHORIZE

    // START OF 400 BAD REQUEST (Before making DB connections)

    try {
        // Check for existance and type basic first.
        if (!request.body.title && !(isString(request.body.title)) &&
            !request.body.description && !(isString(request.body.description)) &&
            !request.body.artist && !(isString(request.body.artist)) &&
            !request.body.date && !(isString(request.body.date)) &&
            !request.body.venue.name && !(isString(request.body.venue.name)) &&
            !request.body.venue.address && !(isString(request.body.venue.address)) &&
            !request.body.venue.capacity && !(isNumber(request.body.venue.capacity))) {

            response.status(400);
            response.json({
                message: "La syntaxe du corps de la requête ne respecte pas ce qui est attendu.",
                example: Event.example
            });
            response.end();
            return;
        }

        // Create Venue
        venue.name = request.body.venue.name;
        venue.address = request.body.venue.address;
        venue.capacity = request.body.venue.capacity;

        // Create Event
        event.title = request.body.title;
        event.description = request.body.description;
        event.artist = request.body.artist;
        event.venue = venue;
        if (request.body.imageURL) {
            if (isUrl(request.body.imageURL)) {
                event.image = request.body.imageURL;
            } else {
                event.image = "https://vente2-gti525.herokuapp.com/assets/images/placeholder-image-icon-21.jpg"; // Placeholder image
            }
        }
        event.dateEvent = new Date(request.body.date);
        event.saleStatus = 0; // Not one sale

        // If the tickets are included
        if (request.body.tickets) {

            if (!(isArray(request.body.tickets))) {
                response.status(400);
                response.json({
                    message: "La syntaxe du corps de la requête ne respecte pas ce qui est attendu.",
                    example: Event.exampleWithTickets
                });
                response.end();
                return;
            }
            request.body.tickets.forEach(element => {
                // console.log("Price: " + element.price + ", isNumber: " + isNumber(element.price));
                // console.log("UUID: " + element.uuid + ", isUUID: " + anyNonNil(element.uuid));
                if ( !(isNumber(element.price)) && !(anyNonNil(element.uuid)) ) {
                    response.status(400);
                    response.json({
                        message: "La syntaxe du corps de la requête ne respecte pas ce qui est attendu.",
                        example: Event.exampleWithTickets
                    });
                    response.end();
                    return;
                }
                tickets.push(new Ticket(element.uuid, element.price, event));
            });
            if (checkDuplicateInObject("uuid", tickets)) {
                response.status(409);
                    response.json({
                        message: "Les billets soumis ne sont pas uniques (uuid).",
                    });
                    response.end();
                    return;
            }
            // console.log(tickets.length);
        }

    // Catch JSON errors such as missing properties from the previous checks or other syntax errors.
    } catch (err) {
        // throw(err);
        response.status(400);
        response.json({
            message: "La syntaxe du corps de la requête ne respecte pas ce qui est attendu.",
            example: Event.exampleWithTickets
        });
        response.end();
        return;
    }

    // TODO: Check for type compatibility between DB and properties from the JSON (such as string size)

    // TODO: Check that the JSON properties retrieved respect a specific format (maybe?)

    // DB insertions
    // Venue first since Event (Many) has a Venue (One) as a foreign key.
    const venueRepository = getManager().getRepository(Venue);
    await venueRepository.save(venue);

    // It will automatically add the Venue foreign key, since it is part of the entity.
    const eventRepository = getManager().getRepository(Event);
    const dbResponse = await eventRepository.insert(event);
    const eventId = dbResponse.identifiers.pop().id;

    // Ticket (Many) last, since it contains Event (One) as a foreign key.
    const ticketRepository = getManager().getRepository(Ticket);
    await ticketRepository.save(tickets, {chunk: tickets.length / 500});


    response.set("Location", "/events/" + eventId);
    response.status(201);
    response.json({
        id: eventId,
        message: "TODO"
    });
    response.end();
    return;
}

/**
 * Delete an event from the database
 */
export async function deleteEventById(request: Request, response: Response) {

    // get a event repository to perform operations with event
    const eventRepository = getManager().getRepository(Event);


    // if event was not found return 404 to the client
    if (true) {
        response.status(501);
        response.json({
            message: "Service n'est pas encore implémenté.",
        });
        response.end();
        return;
    }
}
/**
 * Replace an event from the database
 */
export async function replaceEventById(request: Request, response: Response) {

    // get a event repository to perform operations with event
    const eventRepository = getManager().getRepository(Event);

    if (true) {
        response.status(501);
        response.json({
            message: "Service n'est pas encore implémenté.",
        });
        response.end();
        return;
    }
}

/**
 * Publish an event (make it viewable online and sellable)
 */
export async function publishEventById(request: Request, response: Response) {

    // get a event repository to perform operations with event
    const eventRepository = getManager().getRepository(Event);

    if (true) {
        response.status(501);
        response.json({
            message: "Service n'est pas encore implémenté.",
        });
        response.end();
        return;
    }
}

/**
 * Termine the sell of an event and return all tickets
 */
export async function terminateEventById(request: Request, response: Response) {

    // get a event repository to perform operations with event
    const eventRepository = getManager().getRepository(Event);

    if (true) {
        response.status(501);
        response.json({
            message: "Service n'est pas encore implémenté.",
        });
        response.end();
        return;
    }
}

/**
 * Return all tickets from an event by its Id
 */
export async function getTicketsFromEventById(request: Request, response: Response) {

    // get a event repository to perform operations with event
    const eventRepository = getManager().getRepository(Event);

    if (true) {
        response.status(501);
        response.json({
            message: "Service n'est pas encore implémenté.",
        });
        response.end();
        return;
    }
}

/**
 * Replace all tickets from an event by its Id
 */
export async function replaceTicketsFromEventById(request: Request, response: Response) {

    // get a event repository to perform operations with event
    const eventRepository = getManager().getRepository(Event);

    if (true) {
        response.status(501);
        response.json({
            message: "Service n'est pas encore implémenté.",
        });
        response.end();
        return;
    }
}

/**
 * Delete all tickets from an event by its Id
 */
export async function deleteTicketsFromEventById(request: Request, response: Response) {

    // get a event repository to perform operations with event
    const eventRepository = getManager().getRepository(Event);

    if (true) {
        response.status(501);
        response.json({
            message: "Service n'est pas encore implémenté.",
        });
        response.end();
        return;
    }
}
