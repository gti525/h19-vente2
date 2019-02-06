import { Component, OnInit } from '@angular/core';
import { CONFIRMATION } from '../mock/mock-confirmation';


@Component({
  selector: 'app-checkout-confirmation',
  templateUrl: './checkout-confirmation.component.html',
  styleUrls: ['./checkout-confirmation.component.css']
})
export class CheckoutConfirmationComponent implements OnInit {

  social = true;
  confirmation = CONFIRMATION;

  constructor() { }

  ngOnInit() {
  }

}
