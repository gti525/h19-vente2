import { getManager } from "typeorm";
import { Transaction, transactionStatuses } from "../entity/Transaction";
import { Request, Response } from "express";
import { addUser } from "./userController";
import { getTicketsByUuidArray } from "./ticketController";
import { isArray } from "util";

/**
 * Add a transaction to the DB, from a ticket & user.
 */
export async function addTransaction(request: Request, response: Response) {
    console.log(`POST /transactions`);

    const transactionRepository = getManager().getRepository(Transaction);
    const transaction = new Transaction();
    try {
        // 400
        if (!request.body.transactionConfirmation) {
            throw new Error("confirmation");
        }
        if (!isArray(request.body.tickets)) {
            throw new Error("tickets");
        }
        for (const item of request.body.tickets) {
            if (!item.uuid) {
                throw new Error("tickets");
            }
        }
        if (!request.body.user.name || !request.body.user.surname) {
            throw new Error("user");
        }

        transaction.transactionConfirmation = request.body.transactionConfirmation;

        transaction.transactionConfirmation = request.body.transactionConfirmation;
        const user = await addUser(request.body.user.name, request.body.user.surname, request.body.user.socialLink || null);
        if (!user) {
            response.status(500);
            response.json({
                message:
                  "Le serveur n'a pu trouver ou créer l'usager."
            });
            response.end();
            return;
        }
        transaction.user = user;

        const tickets = await getTicketsByUuidArray(request.body.tickets);
        if (tickets.length === 0) {
            response.status(409);
            response.json({
                message:
                  "Les billets fournis n'ont pu être assigné à la transaction."
            });
            response.end();
            return;
        }
        // console.log(tickets);
        transaction.tickets = tickets;
        const dbResponse = await transactionRepository.save(transaction);
        // console.log(dbResponse);

    } catch (err) {
        response.status(400);
        response.json({
        message:
          "La syntaxe du corps de la requête ne respecte pas ce qui est attendu.",
        example: Transaction.example
      });
      response.end();
      return;
    }

    // return loaded events
    response.status(201);
    response.end();
    return;
}

export async function cancelTransaction(request: Request, response: Response) {
    console.log(`POST /transactions/${request.params.confirmationNumber}/_cancel`);

    const transactionRepository = getManager().getRepository(Transaction);
    try {

        const transaction = await transactionRepository.findOne({
            where: {
                transactionConfirmation: request.params.confirmationNumber
            },
            relations: ["tickets"]
        });
        if (!transaction) {
            response.status(404);
            response.end();
            return;
        }
        const difference = (new Date()).valueOf() - transaction.createdAt.valueOf();
        // console.log(difference);
        // 1 minute = 60000 ms
        if (difference <= 60000) {
            transaction.transactionStatus = transactionStatuses.CANCELLED;
            transaction.tickets = null;
            await transactionRepository.save(transaction);
            response.status(204);
            response.end();
            return;
        } else {
            response.status(403);
            response.json({
                message: "Trop de temps a passé pour que la transaction puisse être annulée."
            });
            response.end();
            return;
        }
    } catch (error) {
        response.status(500);
        response.end();
        return;
    }

}
