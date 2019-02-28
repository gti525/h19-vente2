import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Event} from "../entity/Event";

/**
 * Loads all posts from the database.
 */
export async function getAllEvents(request: Request, response: Response) {

    // get a post repository to perform operations with post
    const postRepository = getManager().getRepository(Event);

    // load a post by a given post id
    const events = await postRepository.find();

    // return loaded posts
    response.send(events);
}