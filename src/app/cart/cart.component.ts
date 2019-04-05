import { Component, OnInit } from '@angular/core';
import { Cart, CartTicket, ShowCart } from '../models/cart';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { CheckoutPassService } from "../services/checkout-pass.service";
import { Event } from '../models/event';
import { Ticket } from '../models/ticket';
import { HeaderUpdateService } from '../header-update.service';
import { CartUpdateService } from '../cart-update.service';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
	public cart: Cart;
	public showCart: ShowCart;
	public total: number;
	public empty: boolean = false;

	constructor(
		public checkoutPassService: CheckoutPassService,
		private cartService: CartService,
		private headerUpdateService: HeaderUpdateService,
		private cartUpdateService: CartUpdateService,
		private router: Router
	) { }

	ngOnInit() {
		this.getCart();

		// Update the cart infos if notified
  	this.cartUpdateService.updates.subscribe(() => {
  		this.getCart();
  	});
	}

	getCart() {
		this.cartService.getCart().subscribe(data => {
			if (!("error" in data)) {
				this.empty = false;
				this.cart = data as Cart;
				this.calculateTotal();
				this.generateShowCart();
			} else {
				this.showCart = null;
				this.empty = true;
				console.log(data);
			}
		});

		this.headerUpdateService.updateHeader();
	}

	calculateTotal() {
		this.total = 0;

		for (let i = 0; i < this.cart.tickets.length; i++) {
			this.total += Number(this.cart.tickets[i].price);
		}
	}

	generateShowCart() {
		let eventIds = [];
		let showCart = new ShowCart();
		showCart.tickets = [];

		for (let i = 0; i < this.cart.tickets.length; i++) {
			if (eventIds.includes(this.cart.tickets[i].event.id)) {
				for (let j = 0; j < showCart.tickets.length; j++) {
					if (showCart.tickets[j].ticket.event.id == this.cart.tickets[i].event.id) {
						showCart.tickets[j].count++;
						break;
					}
				}
			} else {
				let ticket = new CartTicket();
				ticket.ticket = this.cart.tickets[i];
				ticket.count = 1;
				showCart.tickets.push(ticket);
				eventIds.push(this.cart.tickets[i].event.id);
			}
		}

		this.showCart = showCart;
	}

	onAddClick(ticket: CartTicket) {
		let obj = Object.assign({}, ticket.ticket);
		obj["add"] = true;
		this.cartService.editTicket(obj).subscribe(data => {
			if (!("error" in data)) {
				this.getCart();
			} else if (data["error"] == 1) {
        this.headerUpdateService.changeErrorMessage("Le panier est plein (6 billets maximum).");
      } else if (data["error"] == 3) {
        this.headerUpdateService.changeErrorMessage("Il n'y a présentement plus de billets disponibles pour le spectacle. Veuillez réessayer plus tard.");
      } else if (data["error"] == 4) {
      	this.headerUpdateService.changeErrorMessage("Le panier a expiré.");
      	this.getCart();
      }
		})
	}

	onSubClick(ticket: CartTicket) {
		let obj = Object.assign({}, ticket.ticket);
		obj["add"] = false;
		this.cartService.editTicket(obj).subscribe(data => {
			if (!("error" in data)) {
				this.getCart();
			} else if (data["error"] == 4) {
      	this.headerUpdateService.changeErrorMessage("Le panier a expiré.");
      	this.getCart();
      }
		})
	}

	onRemoveClick(ticket: CartTicket) {
		this.cartService.removeTicket(ticket.ticket.id).subscribe(data => {
			if ("error" in data && data["error"] == 4) {
      	this.headerUpdateService.changeErrorMessage("Le panier a expiré.");
      }

      this.getCart();
		})
	}

	onTicketClick(eventId: number) {
		this.router.navigate(['/show', eventId]);
	}

	//pass the cart to the checkout service on checkout button click
	onCheckoutClick() {
		this.checkoutPassService.showCart = this.showCart;
		this.checkoutPassService.cart = this.cart;
		this.router.navigate(["checkout-client-information"]);
	}
}