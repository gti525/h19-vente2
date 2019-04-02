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
  total: number;

  constructor(
    public checkoutPassService: CheckoutPassService,
    private loginSocialService: LoginSocialService
  ) { }

  ngOnInit() {
    this.user = this.checkoutPassService.user;
    this.creditCard = this.checkoutPassService.creditCard;
    this.showCart = this.checkoutPassService.showCart;
    this.cart = this.checkoutPassService.cart;
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = 0;

    for (let i = 0; i < this.cart.tickets.length; i++) {
      this.total += Number(this.cart.tickets[i].price);
    }
  }

  onConfirm() {
    console.log("onConfirm");


    //commit transaction in our DB
    this.checkoutPassService.commitTransactionToOurAPI()
      .then(res => {
        console.log("response from commit to our API: ", res);

      })
      .catch(err => {
        console.log("error from commit to our API: ", err);
      });


    //commit the transaction with passerelle
    this.checkoutPassService.commitTransaction()
      .then(res => {
        console.log("response from commit to passerelle : ", res);

      })
      .catch(err => {
        console.log("error from commit to passerelle: ", err);
      });

    //sends ticket to social
    this.postTicketToSocial();
  }

  postTicketToSocial() {
    //si l'utilisateur s'est login par social.
    if (this.checkoutPassService.getUserSocial()) {

      this.showCart.tickets.forEach(function (ticket) {
        this.loginSocialService.postTicket(ticket)
          .then(res => {
            console.log("Saucial says its all good : ", res);
          })
          .catch(err => {
            console.log("Error in post ticket to social :", err.response);
          });
      });
    }
  }

}
