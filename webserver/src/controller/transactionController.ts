import { getManager } from "typeorm";
import { Transaction } from "../entity/Transaction";
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
        if (!request.body.transactionConfirmation){
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

        transaction.dateTransaction = new Date();
        transaction.transactionConfirmation = request.body.transactionConfirmation;

        transaction.transactionConfirmation = request.body.transactionConfirmation;
        const user = await addUser(request.body.user.name, request.body.user.surname, request.body.user.socialLink || null);
        if (!user) {
            response.status(409);
            response.json({
                message:
                  "Plus d'un usager match celui fournit."
            });
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