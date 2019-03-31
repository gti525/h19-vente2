import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart';
import { CartService } from '../cart.service';
import { HeaderUpdateService } from '../header-update.service';
import { CartUpdateService } from '../cart-update.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	public cart: Cart;
	public count: number = 0;
	public remainingTime: number = -1;
	private intervalId: number;

  constructor(
  	private cartService: CartService, 
  	private headerUpdateService: HeaderUpdateService,
  	private cartUpdateService: CartUpdateService,
  	private router: Router
  ) { }

  ngOnInit() {
  	this.getCart();

  	// Update the cart infos if notified
  	this.headerUpdateService.updates.subscribe(() => {
  		this.remainingTime = -1;
  		this.getCart();
  	});
  }

  getCart() {
		this.cartService.getCart().subscribe(data => {
			if (!("error" in data)) {
				this.cart = data as Cart;
				this.count = this.cart.tickets.length;

				clearInterval(this.intervalId);
				let self = this;
		  	this.intervalId = window.setInterval(function() {
		  		self.cartService.getRemainingTime().subscribe(data => {
		  			if (!("error" in data)) {
		  				self.remainingTime = data["remainingTime"];
		  			} else {
		  				self.remainingTime = 0;
		  				clearInterval(self.intervalId);
		  				self.cartUpdateService.updateCart();
		  			}
		  		})
		  	}, 1000);
			} else {
				this.cart = null;
				this.count = 0;
				this.remainingTime = -1;
				console.log(data);
			}
		});
	}

}
