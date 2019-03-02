import { Component, OnInit } from '@angular/core';
import { Ticket } from "../models/ticket";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  tickets: Ticket;


  constructor() { }

  ngOnInit() {
  }

}
