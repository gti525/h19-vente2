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
        path: "/event/:id",
        method: "get",
        action: eventController.getEventById
    },
    {
        path: "/venues",
        method: "get",
        action: venueController.getAllVenues
    },
    {
        path: "/venue/:id",
        method: "get",
        action: venueController.getVenueById
    }
];