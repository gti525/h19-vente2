import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Event } from "../entity/Event";
import { Venue } from "../entity/Venue";
import { isNumber, isString, isArray } from "util";
import { Ticket } from "../entity/Ticket";
import { anyNonNil } from "is-uuid";
import { checkDuplicateInObject } from "../lib/tools";
import isUrl = require("is-url");
import { getSoldTicketsForEvent, getFreeTicketsForEvent, deleteTicketsForEvent } from "./ticketController";

/**
 * Loads all events from the database.
 */
export async function getAllEvents(response: Response) {

    console.log(`GET /events`);
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

    console.log(`GET /events/${request.params.eventId}`);
    // get a event repository to perform operations with event
    const eventRepository = getManager().getRepository(Event);

    // load a event by a given event id and its associated venue
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

    console.log(`POST /events`);

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
        if (request.body.organisation && isString(request.body.organisation)) {
            event.organisation = request.body.organisation;
        }
        event.venue = venue;
        if (request.body.imageUrl) {
            if (isUrl(request.body.imageUrl)) {
                event.image = request.body.imageUrl;
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
            for (const element of request.body.tickets) {
                // console.log("Price: " + element.price + ", isNumber: " + isNumber(element.price));
                // console.log("UUID: " + element.uuid + ", isUUID: " + anyNonNil(element.uuid));
                if ( !(isNumber(element.price)) || !(anyNonNil(element.uuid)) ) {
                    response.status(400);
                    response.json({
                        message: "La syntaxe du corps de la requête ne respecte pas ce qui est attendu.",
                        example: Event.exampleWithTickets
                    });
                    response.end();
                    return;
                }
                const ticket = new Ticket();
                ticket.uuid = element.uuid;
                ticket.price = element.price;
                ticket.event = event;
                tickets.push(ticket);
            }
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

    console.log(`DELETE /events/${request.params.eventId}`);
    // TODO: 401 Unauthorized

    // get a event repository to perform operations with event
    const eventRepository = getManager().getRepository(Event);

    const event = await eventRepository.findOne(request.params.eventId);

    // if event was not found return 404 to the client
    if (!event) {
        response.status(404);
        response.json({
            message: "Un spectacle avec l'ID soumis n'a pas été trouvé.",
        });
        response.end();
        return;
    }

    // if event is online [saleStatus = 1], return 409
    if (event.saleStatus === 1) {
      response.status(409);
      response.json({
            message: "Le spectacle est présentement en vente; terminer la vente avant d'envoyer la requête à nouveau.",
      });
      response.end();
      return;
    }

    // if event is offline, but has tickets sold, return 403
    if (event.saleStatus === 2) {
      response.status(403);
      response.json({
            message: "Le spectacle ne peut être supprimé; des billets ont été vendus.",
      });
      response.end();
      return;
    }

    const ticketsResult = await deleteTicketsForEvent(event);
    if (ticketsResult === 1) {
        // Tickets are sold, cannot delete
        response.status(403);
        response.json({
                message: "Le spectacle ne peut être supprimé; des billets ont été vendus.",
        });
        response.end();
        return;
    } else if (ticketsResult === 2 || ticketsResult === 0 ) {}

    response.status(204);
    response.end();
}
/**
 * Replace an event from the database
 */
export async function replaceEventById(request: Request, response: Response) {

    console.log(`PUT /events/${request.params.eventId}`);

    // TODO: 401 UNAUTHORIZE

    const eventRepository = getManager().getRepository(Event);

    const event = await eventRepository.findOne(request.params.eventId);

    // 404
    if (!event) {
        response.status(404);
        response.json({
            message: "Un spectacle avec l'ID soumis n'a pas été trouvé.",
        });
        response.end();
        return;
    }

    // 409
    if (event.saleStatus === 1) {
        response.status(409);
        response.json({
            message: "Le spectacle est présentement en vente; terminer la vente avant d'envoyer la requête à nouveau.",
        });
        response.end();
        return;
    }

}

/**
 * Publish an event (make it viewable online and sellable)
 */
export async function publishEventById(request: Request, response: Response) {

    console.log(`POST /events/${request.params.eventId}/_publish`);

    // TODO: 401 UNAUTHORIZE

    // get a event repository to perform operations with event
    const eventRepository = getManager().getRepository(Event);

    const event = await eventRepository.findOne(request.params.eventId);

    // 404
    if (!event) {
        response.status(404);
        response.json({
            message: "Un spectacle avec l'ID soumis n'a pas été trouvé.",
        });
        response.end();
        return;
    }

    // 409
    if (event.saleStatus === 1) {
        response.status(409);
        response.json({
            message: "Le spectacle est présentement en vente; terminer la vente avant d'envoyer la requête à nouveau.",
        });
        response.end();
        return;
    }

    // 204
    if (event.saleStatus === 0 || event.saleStatus === 2) {

        event.saleStatus = 1;
        eventRepository.save(event);

        response.status(204);
        response.end();
        return;

    // Disaster
    } else {
        response.status(500);
        response.json({
            message: "Something went horribly and terribly wrong; the event is in some kind of limbo.",
        });
        response.end();
    }
}

/**
 * Termine the sell of an event and return all tickets
 */
export async function terminateEventById(request: Request, response: Response) {

    console.log(`POST /events/${request.params.eventId}/_terminate`);
    // TODO: 401 UNAUTHORIZE

    // get a event repository to perform operations with event
    const eventRepository = getManager().getRepository(Event);

    const event = await eventRepository.findOne(request.params.eventId);

    // 404
    if (!event) {
        response.status(404);
        response.json({
            message: "Un spectacle avec l'ID soumis n'a pas été trouvé.",
        });
        response.end();
        return;
    }

    // 409
    if (event.saleStatus === 0 || event.saleStatus === 2) {
        response.status(409);
        response.json({
            message: "Le spectacle n'est présentement pas en vente; publier la vente avant d'envoyer la requête à nouveau.",
        });
        response.end();
        return;
    }

    // 200
    if (event.saleStatus === 1) {

        const soldTickets = await getSoldTicketsForEvent(event);

        if (soldTickets.length !== 0) {
            event.saleStatus = 2;
            for (const ticket of soldTickets) {
                delete ticket.id;
                ticket["status"] = "vendu";
                // console.log(ticket);
            }
        }
        event.saleStatus = 0;
        eventRepository.save(event);
        const freeTickets = await getFreeTicketsForEvent(event);
        if (freeTickets.length !== 0) {
            for (const ticket of freeTickets) {
                delete ticket.id;
                ticket["status"] = "disponible";
                // console.log(ticket);
            }
        }
        const tickets = freeTickets.concat(soldTickets);
        // console.log(JSON.stringify(tickets));

        response.status(200);
        response.json(tickets);
        response.end();
        return;

    // Disaster
    } else {
        response.status(500);
        response.json({
            message: "Something went horribly and terribly wrong; the event is in some kind of limbo and the tickets have been abducted.",
        });
        response.end();
    }
}

/**
 * Return all tickets from an event by its Id
 */
export async function getTicketsFromEventById(request: Request, response: Response) {

    console.log(`GET /events/${request.params.eventId}/tickets`);
    // TODO: 401 UNAUTHORIZE

    // get a event repository to perform operations with event
    const eventRepository = getManager().getRepository(Event);

    const event = await eventRepository.findOne(request.params.eventId);

    // 404
    if (!event) {
        response.status(404);
        response.json({
            message: "Un spectacle avec l'ID soumis n'a pas été trouvé.",
        });
        response.end();
        return;
    }

    const soldTickets = await getSoldTicketsForEvent(event);
    if (soldTickets.length !== 0) {
        for (const ticket of soldTickets) {
            delete ticket.id;
            ticket["status"] = "vendu";
            // console.log(ticket);
        }
    }
    const freeTickets = await getFreeTicketsForEvent(event);
    if (freeTickets.length !== 0) {
        for (const ticket of freeTickets) {
            delete ticket.id;
            ticket["status"] = "disponible";
            // console.log(ticket);
        }
    }

    const tickets = freeTickets.concat(soldTickets);
    // console.log(JSON.stringify(tickets));

    response.status(200);
    response.json(tickets);
    response.end();
    return;
}

/**
 * Replace all tickets from an event by its Id
 */
export async function replaceTicketsFromEventById(request: Request, response: Response) {

    console.log(`PUT /events/${request.params.eventId}/tickets`);

    // TODO: 401 UNAUTHORIZE

    // 404
    const eventRepository = getManager().getRepository(Event);
    const event = await eventRepository.findOne(request.params.eventId);

    // if event was not found return 404 to the client
    if (!event) {
        response.status(404);
        response.json({
            message: "Un spectacle avec l'ID soumis n'a pas été trouvé.",
        });
        response.end();
        return;
    }
    // if event is online [saleStatus = 1], return 409
    if (event.saleStatus === 1) {
        response.status(409);
        response.json({
              message: "Le spectacle est présentement en vente; terminer la vente avant d'envoyer la requête à nouveau.",
        });
        response.end();
        return;
      }

      // if event is offline, but has tickets sold, return 403
      if (event.saleStatus === 2) {
        response.status(403);
        response.json({
              message: "Les billets ne peuvent être remplacés; certains ont été vendus.",
        });
        response.end();
        return;
      }

    try{
         // If the body has something
        if (request.body) {

            if (!(isArray(request.body))) {
                response.status(400);
                response.json({
                    message: "La syntaxe du corps de la requête ne respecte pas ce qui est attendu.",
                    example: Ticket.exampleWithArray
                });
                response.end();
                return;
            }
            const tickets = new Array<Ticket>();
            for (const element of request.body) {
                // console.log("Price: " + element.price + ", isNumber: " + isNumber(element.price));
                // console.log("UUID: " + element.uuid + ", isUUID: " + anyNonNil(element.uuid));
                if ( !(isNumber(element.price)) || !(anyNonNil(element.uuid)) ) {
                    response.status(400);
                    response.json({
                        message: "La syntaxe du corps de la requête ne respecte pas ce qui est attendu.",
                        example: Ticket.exampleWithArray
                    });
                    response.end();
                    return;
                }
                const ticket = new Ticket();
                ticket.uuid = element.uuid;
                ticket.price = element.price;
                ticket.event = event;
                tickets.push(ticket);
            }
            if (checkDuplicateInObject("uuid", tickets)) {
                response.status(409);
                    response.json({
                        message: "Les billets soumis ne sont pas uniques (uuid).",
                    });
                    response.end();
                    return;
            }
            const ticketsResult = await deleteTicketsForEvent(event);
            if (ticketsResult === 1) {
                // Tickets are sold, cannot delete
                response.status(403);
                response.json({
                        message: "Les billets ne peuvent être remplacés; certains ont été vendus.",
                });
                response.end();
                return;
            } else if (ticketsResult === 2 || ticketsResult === 0 ) {}

            const ticketRepository = getManager().getRepository(Ticket);
            await ticketRepository.save(tickets, {chunk: tickets.length / 500});
            response.status(204);
            response.end();
        }
    } catch (err) {
        response.status(400);
        response.json({
            message: "La syntaxe du corps de la requête ne respecte pas ce qui est attendu.",
            example: Ticket.exampleWithArray
        });
        response.end();
        return;
    }
}

/**
 * Delete all tickets from an event by its Id
 */
export async function deleteTicketsFromEventById(request: Request, response: Response) {

    console.log(`DELETE /events/${request.params.eventId}/tickets`);
    // get a event repository to perform operations with event
    const eventRepository = getManager().getRepository(Event);

    // TODO: 401 Unauthorized

    const event = await eventRepository.findOne(request.params.eventId);

    // if event was not found return 404 to the client
    if (!event) {
        response.status(404);
        response.json({
            message: "Un spectacle avec l'ID soumis n'a pas été trouvé.",
        });
        response.end();
        return;
    }

    // if event is online [saleStatus = 1], return 409
    if (event.saleStatus === 1) {
      response.status(409);
      response.json({
            message: "Le spectacle est présentement en vente; terminer la vente avant d'envoyer la requête à nouveau.",
      });
      response.end();
      return;
    }

    // if event is offline, but has tickets sold, return 403
    if (event.saleStatus === 2) {
      response.status(403);
      response.json({
            message: "Le spectacle ne peut être supprimé; des billets ont été vendus.",
      });
      response.end();
      return;
    }

    const ticketsResult = await deleteTicketsForEvent(event);
    if (ticketsResult === 1) {
        // Tickets are sold, cannot delete
        response.status(403);
        response.json({
                message: "Les billets ne peuvent pas être supprimé; certains ont été vendus.",
        });
        response.end();
        return;
    } else if (ticketsResult === 2) {
        // There wasn't any tickets
        response.status(404);
        response.json({
                message: "Le spectacle spécifié ne possède pas de billets.",
        });
        response.end();
        return;
    }

    response.status(204);
    response.end();
}

/**
 * Update an event from the database
 */
export async function updateEvent(request: Request, response: Response) {

    const newID = parseInt(request.params.id, 10);
    const newUrlImg = String(request.body);

    const eventRepository = getManager().getRepository(Event);
    // TODO: Tickets

    const dbResponse = await eventRepository.query("UPDATE Event SET image = ? WHERE id = ?", [newUrlImg, newID]);

    const eventId = dbResponse.identifiers.pop().id;

    response.set("Location", "/events/" + eventId);
    response.status(201);
    response.json({
        id: eventId,
        message: "TODO"
    });
    response.end();
    return;

}
