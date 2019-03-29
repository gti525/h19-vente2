import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart';
import { CartService } from '../cart.service';
import { HeaderUpdateService } from '../header-update.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	public cart: Cart;
	public count: number = 0;

  constructor(
  	private cartService: CartService, 
  	private headerUpdateService: HeaderUpdateService
  ) { }

  ngOnInit() {
  	this.getCart();
  	this.headerUpdateService.notification.subscribe(data => {
  		this.getCart();
  	});
  }

  getCart() {
		this.cartService.getCart().subscribe(data => {
			if (!("error" in data)) {
				this.cart = data as Cart;
				this.count = this.cart.tickets.length;
			} else {
				console.log(data);
			}
		});
	}

}
