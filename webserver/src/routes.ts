import * as eventController from "./controller/eventController";
import * as venueController from "./controller/venueController";


/**
 * All application routes.
 */
export const AppRoutes = [
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
        action: eventController.deleteEvent
    },
    {
        path: "/events/:eventId",
        method: "put",
        action: eventController.updateEvent
    },
    {
        path: "/events/:eventId",
        method: "put",
        action: eventController.getEventById
    },
    {
        path: "/events/:eventId/tickets",
        method: "get",
        action: eventController.getEventById
    },
    {
        path: "/events/:eventId/tickets",
        method: "put",
        action: eventController.getEventById
    },
    {
        path: "/events/:eventId/tickets",
        method: "delete",
        action: eventController.getEventById
    },
    {
        path: "/events/:eventId/_publish",
        method: "post",
        action: eventController.getEventById
    },
    {
        path: "/events/:eventId/_terminate",
        method: "post",
        action: eventController.getEventById
    },
    {
        path: "/venues",
        method: "get",
        action: venueController.getAllVenues
    },
    {
        path: "/venue/:venueId",
        method: "get",
        action: venueController.getVenueById
    }
];
