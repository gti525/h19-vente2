import { Component, OnInit, HostListener } from '@angular/core';
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
	public errorMessage: string = "";
	private intervalId: number;

	public searchGroup: FormGroup;

	private userActivity;
	private inactivityStarted: boolean = false;
	private TIMEOUT_TIME: number = 600000;

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

		// Update error message if needed
		this.headerUpdateService.errorMessage.subscribe(message => {
			this.errorMessage = message;
		});

		this.searchGroup = this.formBuilder.group({
			search: ['', ]
		});
	}

	startInactivityTimer() {
		this.userActivity = setTimeout(() => {
			this.cartService.cartExpire().subscribe(data => {
				console.log(data);
			});
		}, this.TIMEOUT_TIME);
	}

	@HostListener('window:mousemove')
	refreshInactivityState() {
		clearTimeout(this.userActivity);
		this.startInactivityTimer();
	}

	getCart() {
		this.cartService.getCart().subscribe(data => {
			if (!("error" in data)) {
				this.cart = data as Cart;
				this.count = this.cart.tickets.length;

				// Server expiration
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

				// Inactivity expiration
				if (!this.inactivityStarted) {
					this.startInactivityTimer();
					this.inactivityStarted = true;
				}
			} else {
				this.cart = null;
				this.count = 0;
				this.remainingTime = -1;
				console.log(data);
			}
		});
	}

	onSearch() {
		var term = this.searchGroup.get("search").value;
		console.log("onSearch : ", term);
		this.eventService.searchEvents(term).subscribe((res : Event[])=>{
			this.eventService.setSearchResult(res);
			console.log("onSearch : ", res);
			this.router.navigate(['/home', res]);;
		});
	}

	onCloseErrorClick() {
		this.errorMessage = "";
	}

}
