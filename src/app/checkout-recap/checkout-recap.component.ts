import { Component, OnInit } from '@angular/core';
import { SPECTACLES } from '../mock/mock-spectacle';

@Component({
  selector: 'app-checkout-recap',
  templateUrl: './checkout-recap.component.html',
  styleUrls: ['./checkout-recap.component.css']
})
export class CheckoutRecapComponent implements OnInit {


  spectacles = SPECTACLES;

  constructor() { }

  ngOnInit() {
  }

}
