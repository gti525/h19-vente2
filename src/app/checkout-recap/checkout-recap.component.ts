import { Component, OnInit } from '@angular/core';
import { SPECTACLES } from '../mock/mock-spectacles';

import { CheckoutPassService } from "../services/checkout-pass.service"
import { CreditCard } from "../models/credit-card";
import { User } from "../models/user";
import { ShowCart, Cart } from '../models/cart';
import { LoginSocialService } from '../services/login-social.service';

@Component({
  selector: 'app-checkout-recap',
  templateUrl: './checkout-recap.component.html',
  styleUrls: ['./checkout-recap.component.css']
})
export class CheckoutRecapComponent implements OnInit {


  spectacles = SPECTACLES;
  user: User;
  creditCard: CreditCard;
  userSocial;
  cart: Cart;
  showCart: ShowCart;
  total:number;

  constructor(
    public checkoutPassService: CheckoutPassService,
    private loginSocialService: LoginSocialService
  ) { }

  ngOnInit() {
    this.user = this.checkoutPassService.user;
    this.creditCard = this.checkoutPassService.creditCard;
    this.showCart = this.checkoutPassService.showCart;
    this.cart = this.checkoutPassService.cart;
  }

  calculateTotal() {
		this.total = 0;

		for (let i = 0; i < this.cart.tickets.length; i++) {
			this.total += Number(this.cart.tickets[i].price);
		}
	}

  onConfirm() {
    console.log("onConfirm");
    var confirmation = this.checkoutPassService.confirmTransaction();
    if(confirmation){
      this.postTicketToSocial();
    }
  }

  postTicketToSocial() {
    //si l'utilisateur s'est login par social.
    if (this.checkoutPassService.getUserSocial() != 0) {

      this.showCart.tickets.forEach(function (ticket) {
        this.loginSocialService.postTicket(ticket)
          .then(res => {
            
          })
          .catch(err => {


            if (err.response.data.status == 404) {
              console.log(err);
            }
            else {
              console.log(err);
            }
          });
      });
    }
  }

}
