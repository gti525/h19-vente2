import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart, CartTicket } from './models/cart';
import { Event } from './models/event';

@Injectable({
  providedIn: 'root'
})
export class CartService {
	apiURL = 'https://vente2-gti525.herokuapp.com/api/cart'

  constructor(private httpClient: HttpClient) {}

  public getCart() {
    //return this.httpClient.get(this.apiURL);
  }

  public addTicket(event: Event) {
  	//return this.httpClient.post(this.apiURL, event);
  }

  public editTicket(ticket: CartTicket) {
  	//return this.httpClient.put(this.apiURL, ticket);
  }

  public removeTicket(ticket: CartTicket) {
  	//return this.httpClient.delete(this.apiURL, ticket);
  }
}
