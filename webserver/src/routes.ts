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
        path: "/venues",
        method: "get",
        action: venueController.getAllVenues
    }
];