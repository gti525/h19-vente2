import { Component, OnInit } from '@angular/core';
import { SPECTACLES } from '../mock/mock-spectacles';
import { CLIENT1 } from '../mock/mock-client';

@Component({
  selector: 'app-checkout-recap',
  templateUrl: './checkout-recap.component.html',
  styleUrls: ['./checkout-recap.component.css']
})
export class CheckoutRecapComponent implements OnInit {


  spectacles = SPECTACLES;
  client = CLIENT1;

  constructor() { }

  ngOnInit() {
  }

}
