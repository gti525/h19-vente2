import { Component, OnInit } from '@angular/core';
import { SPECTACLES } from '../mock/mock-spectacles';
import { CLIENT1 } from '../mock/mock-client';
import { CREDITCARD } from '../mock/mock-credit-card';

@Component({
  selector: 'app-checkout-recap',
  templateUrl: './checkout-recap.component.html',
  styleUrls: ['./checkout-recap.component.css']
})
export class CheckoutRecapComponent implements OnInit {


  spectacles = SPECTACLES;
  client = CLIENT1;
  creditCard = CREDITCARD;
  constructor() { }

  ngOnInit() {
  }

  getTotal(){
    var total = 0;

    // TODO a modifier lorsque classe spectacle-cart sera créer 
    var quantity = 3;

    for(var i = 0; i < this.spectacles.length; i++){

        var product = this.spectacles[i];
        total += (product.price * quantity);
    }
    return total;
  } 

}
