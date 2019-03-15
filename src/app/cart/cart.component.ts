import { Component, OnInit } from '@angular/core';
import { Cart, CartTicket } from '../models/cart';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cart: Cart;
  public total: number;

  constructor(
  	private cartService: CartService,
    private router : Router
   ) {}

  ngOnInit() {
  	this.getCart();
  }

  getCart() {
  	this.cartService.getCart().subscribe(data => {
  		/* if (!data.error) {
	      this.cart = data;
	      this.calculateTotal();
	    } */
    });
  }

  calculateTotal() {
  	this.total = 0;

  	for (let i = 0; i < this.cart.tickets.length; i++) {
  		let ticket = this.cart.tickets[i];
  		this.total += ticket.count * ticket.ticket.price;
  	}
  }

  onAddClick(ticket: CartTicket) {
  	/*ticket.count += 1;
  	this.cartService.editTicket(ticket).subscribe(data => {
			
  	})*/
  }

  onSubClick(ticket: CartTicket) {
  	/*ticket.count -= 1;
  	this.cartService.editTicket(ticket).subscribe(data => {
  		
  	})*/
  }

  onRemoveClick(ticket: CartTicket) {
  	/*this.cartService.removeTicket(ticket).subscribe(data => {
  		
  	})*/
  }
}