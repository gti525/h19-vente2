import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Venue} from "../entity/Venue";

/**
 * Loads all posts from the database.
 */
export async function getAllVenues(request: Request, response: Response) {

    // get a post repository to perform operations with post
    const postRepository = getManager().getRepository(Venue);

    // load a post by a given post id
    const venues = await postRepository.find();

    // return loaded posts
    response.send(venues);
}