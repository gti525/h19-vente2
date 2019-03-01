import { Component, OnInit } from '@angular/core';
import { SPECTACLES } from '../mock/mock-spectacles';
import { CLIENT1 } from '../mock/mock-client';

import { CheckoutPassService } from "../services/checkout-pass.service"
import { CreditCard } from "../models/credit-card";
import { User } from "../models/user";

@Component({
  selector: 'app-checkout-recap',
  templateUrl: './checkout-recap.component.html',
  styleUrls: ['./checkout-recap.component.css']
})
export class CheckoutRecapComponent implements OnInit {


  spectacles = SPECTACLES;
  client = CLIENT1;
  user: User;
  creditCard: CreditCard;

  constructor(
    public checkoutPassService: CheckoutPassService,
  ) { }

  ngOnInit() {
    this.creditCard = this.checkoutPassService.creditCard;
    this.user = this.checkoutPassService.user;
  }

  getTotal() {
    var total = 0;

    // TODO a modifier lorsque classe spectacle-cart sera créer 
    var quantity = 3;

    for (var i = 0; i < this.spectacles.length; i++) {

      var product = this.spectacles[i];
      total += (product.price * quantity);
    }
    return total;
  }

}
