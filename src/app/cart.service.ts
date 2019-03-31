import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from './models/cart';
import { Event } from './models/event';
import { Ticket } from './models/ticket';

@Injectable({
  providedIn: 'root'
})
export class CartService {
	apiURL = 'https://vente2-gti525.herokuapp.com/api/cart';
  //apiURL = 'http://localhost:8080/api/cart';

  constructor(private httpClient: HttpClient) {}

  public getCart() {
    return this.httpClient.get(this.apiURL);
  }

  public addTicket(event: Event) {
  	return this.httpClient.post(this.apiURL, event);
  }

  public editTicket(ticket: Ticket) {
  	return this.httpClient.put(this.apiURL, ticket);
  }

  public removeTicket(ticketId: number) {
  	return this.httpClient.delete(this.apiURL + `/${ticketId}`);
  }

  public getRemainingTime() {
    return this.httpClient.get(this.apiURL + "/time");
  }

  public cartExpire() {
    return this.httpClient.get(this.apiURL + "/expire");
  }
}
