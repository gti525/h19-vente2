import { Component, OnInit } from '@angular/core';
import { Client } from '../classes/client';

@Component({
  selector: 'app-checkout-client-information',
  templateUrl: './checkout-client-information.component.html',
  styleUrls: ['./checkout-client-information.component.css']
})
export class CheckoutClientInformationComponent implements OnInit {
  
  client : Client = {
    id: 12,
    name: 'Leboeuf',
    firstName: 'Marcel',
    civicAddress: '22 Chemin Macdonald',
    city: 'Montréal',
    province: 'QC',
    postalCode: 'H3C 6A3'  
};
  
  lastUpdate = new Date();
  constructor() {
    
   }

   onSoumettre() {
     console.log('On soumet le formulaire');
   }

  ngOnInit() {
  }

  getStatus() {
    return this.client.name;
  }

}
