import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Venue } from "../entity/Venue";
import { Event } from "../entity/Event";

/**
 * Loads all venues from the database.
 */
export async function getAllVenues(request: Request, response: Response) {

    // get a venue repository to perform operations with venue
    const venueRepository = getManager().getRepository(Venue);

    // load a venue by a given venue id
    const venues = await venueRepository.find();

    // return loaded venues
    response.send(venues);
}

/**
 * Loads one venue from the database
 */
export async function getVenueById(request: Request, response: Response) {

    // get a venue repository to perform operations with venue
    const venueRepository = getManager().getRepository(Venue);

    // load a venue by a given venue id
    const venue = await venueRepository.findOne(request.params.venueId);

    // if venue was not found return 404 to the client
    if (!venue) {
        response.status(404);
        response.end();
        return;
    }

    // return loaded venue
    response.send(venue);
}

export async function getVenueForEvent(event: Event): Promise<Venue> {

    const venueRepository = getManager().getRepository(Venue);

    const venue = await venueRepository.findOne({
        where: {event: event}
    });
    // console.log(venue);
    return venue;
}

export async function deleteVenueForEvent(event: Event): Promise<Boolean> {

    const venueRepository = getManager().getRepository(Venue);

    const venue = await venueRepository.findOne({
        where: {event: event}
    });
    const result = await venueRepository.remove(venue);
    // console.log(result.id);
    return !(result.id);
}
