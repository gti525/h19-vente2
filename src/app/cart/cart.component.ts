import { Component, OnInit } from '@angular/core';
import { Cart, CartTicket } from '../models/cart';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { CheckoutPassService } from "../services/checkout-pass.service";

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
	public cart: Cart;
	public total: number;

	constructor(
		public checkoutPassService: CheckoutPassService,
		private cartService: CartService,
		private router: Router
	) { }

	ngOnInit() {
		this.getCart();
	}

	getCart() {
		this.cartService.getCart().subscribe(data => {
			if (!("error" in data)) {
				this.cart = data as Cart;
				this.calculateTotal();
			}
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
		let copy = new CartTicket();
		Object.assign(copy, ticket);
		copy.count += 1
		this.cartService.editTicket(copy).subscribe(data => {
			if (!("error" in data)) {
				ticket.count += 1
				this.calculateTotal();
			}
		})
	}

	onSubClick(ticket: CartTicket) {
		let copy = new CartTicket();
		Object.assign(copy, ticket);
		copy.count -= 1;
		this.cartService.editTicket(copy).subscribe(data => {
			if (!("error" in data)) {
				ticket.count -= 1
				this.calculateTotal();
			}
		})
	}

	onRemoveClick(ticket: CartTicket) {
		this.cartService.removeTicket(ticket.ticket.id).subscribe(data => {
			if (!("error" in data)) {
				let index: number;

				for (let i = 0; i < this.cart.tickets.length; i++) {
					if (this.cart.tickets[i].ticket.id == ticket.ticket.id) {
						index = i;
						break;
					}
				}

				this.cart.tickets.splice(index, 1);
				this.calculateTotal();
			} else if (data["error"] == 4) {
				this.cart = null;
			}
		})
	}

	//pass the cart to the checkout service on checkout button click
	onCheckoutClick() {
		this.checkoutPassService.cart = this.cart;
		this.router.navigate(["checkout-client-information"]);
	}
}