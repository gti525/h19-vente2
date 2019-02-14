import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-client-information',
  templateUrl: './checkout-client-information.component.html',
  styleUrls: ['./checkout-client-information.component.css']
})
export class CheckoutClientInformationComponent implements OnInit {

  nom_de_famille = 'Saisir nom de famille';
  prenom = 'Saisir prénom';
  adresses_civique = 'Saisir adresse civique';
  ville = 'Saisir ville de résidence';
  province = 'Saisir province de résidence';
  code_postal = 'Saisir code postal';
  lastUpdate = new Date();
  constructor() {
    
   }

   onSoumettre() {
     console.log('On soumet le formulaire');
   }

  ngOnInit() {
  }

  getStatus() {
    return this.nom_de_famille;
  }

}
