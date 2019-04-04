import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart';
import { Event } from '../models/event';
import { CartService } from '../cart.service';
import { HeaderUpdateService } from '../header-update.service';
import { CartUpdateService } from '../cart-update.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EventService } from '../event.service';

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

	public searchGroup: FormGroup;

	constructor(
		private cartService: CartService,
		private headerUpdateService: HeaderUpdateService,
		private cartUpdateService: CartUpdateService,
		private formBuilder: FormBuilder,
		private eventService : EventService,
		private router: Router
	) { }

	ngOnInit() {
		this.getCart();

		// Update the cart infos if notified
		this.headerUpdateService.updates.subscribe(() => {
			this.getCart();
		});
		this.searchGroup = this.formBuilder.group({
			search: ['', ]
		});
	}

	getCart() {
		this.cartService.getCart().subscribe(data => {
			if (!("error" in data)) {
				this.cart = data as Cart;
				this.count = this.cart.tickets.length;

				clearInterval(this.intervalId);
				let self = this;
				this.intervalId = window.setInterval(function () {
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

	onSearch(){
		var term = this.searchGroup.get("search").value;
		console.log("onSearch : ", term);
		this.eventService.searchEvents(term).subscribe((res : Event[])=>{
			this.eventService.setSearchResult(res);
			console.log("onSearch : ", res);
			this.router.navigate(['/home', res]);;
		});
		
	}

}
