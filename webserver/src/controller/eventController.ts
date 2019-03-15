import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Event } from "../entity/Event";
import { Venue } from "../entity/Venue";
import { isNumber, isString, isArray } from "util";

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

        if (request.body.tickets) {


            response.status(400);
            response.json({
                message: "TEST",
                example: Event.example
            });
            response.end();
            return;
        }

    // Catch JSON errors such as missing properties from the previous checks or other syntax errors.
    } catch (err) {
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

    // 201 CREATED
    const venue = new Venue();
    venue.name = request.body.venue.name;
    venue.address = request.body.venue.address;
    venue.capacity = request.body.venue.capacity;
    const venueRepository = getManager().getRepository(Venue);
    await venueRepository.insert(venue);

    const event = new Event();
    const eventRepository = getManager().getRepository(Event);
    event.title = request.body.title;
    event.description = request.body.description;
    event.artist = request.body.artist;
    event.venue = venue;
    event.image = "https://vente2-gti525.herokuapp.com/assets/images/placeholder-image-icon-21.jpg"; // Placeholder image
    event.dateEvent = new Date(request.body.date);
    event.saleStatus = 1; // See Event Entity for meaning.
    const dbResponse = await eventRepository.insert(event);
    const eventId = dbResponse.identifiers.pop().id;
    // TODO: Tickets

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
export async function deleteEvent(request: Request, response: Response) {

    // get a event repository to perform operations with event
    const eventRepository = getManager().getRepository(Event);
}
