import { Component, OnInit } from '@angular/core';
import { CONFIRMATION } from '../mock/mock-confirmation';
import { CheckoutPassService } from '../services/checkout-pass.service';


@Component({
  selector: 'app-checkout-confirmation',
  templateUrl: './checkout-confirmation.component.html',
  styleUrls: ['./checkout-confirmation.component.css']
})
export class CheckoutConfirmationComponent implements OnInit {

  social = false;
  confirmation = "";

  constructor(
    public checkoutPassService: CheckoutPassService
  ) { }

  ngOnInit() {
    this.confirmation = this.checkoutPassService.transaction.transactionConfirmation;
    if(this.checkoutPassService.getUserSocial()){
      this.social = true;
    }
  }
}
