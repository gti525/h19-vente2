import * as eventController from "./controller/eventController";
import * as venueController from "./controller/venueController";
import * as cartController from "./controller/cartController";

import * as socialController from "./controller/socialController";
/**
 * All application routes.
 */
export const AppRoutes = [
    // EVENTS
    {
        path: "/events",
        method: "get",
        action: eventController.getAllEvents
    },
    {
        path: "/events",
        method: "post",
        action: eventController.addEvent
    },
    {
        path: "/event/:eventId",
        method: "get",
        action: eventController.getEventById
    },
    {
        path: "/events/:eventId",
        method: "delete",
        action: eventController.deleteEventById
    },
    {
        path: "/events/:eventId",
        method: "put",
        action: eventController.replaceEventById
    },
    {
        path: "/events/:eventId/tickets",
        method: "get",
        action: eventController.getTicketsFromEventById
    },
    {
        path: "/events/:eventId/tickets",
        method: "put",
        action: eventController.replaceTicketsFromEventById
    },
    {
        path: "/events/:eventId/tickets",
        method: "delete",
        action: eventController.deleteTicketsFromEventById
    },
    {
        path: "/events/:eventId/_publish",
        method: "post",
        action: eventController.publishEventById
    },
    {
        path: "/events/:eventId/_terminate",
        method: "post",
        action: eventController.terminateEventById
    },
    // VENUES
    {
        path: "/venues",
        method: "get",
        action: venueController.getAllVenues
    },
    {
        path: "/venue/:venueId",
        method: "get",
        action: venueController.getVenueById
    },
    // CART
    {
        path: "/cart",
        method: "get",
        action: cartController.getCart
    },
    {
        path: "/cart",
        method: "post",
        action: cartController.addTicket
    },
    {
        path: "/cart",
        method: "put",
        action: cartController.editTicket
    },
    {
        path: "/cart",
        method: "delete",
        action: cartController.removeTicket
    },
    {
        path: "/social/client/login",
        method: "post",
        action: socialController.login
    }
];
