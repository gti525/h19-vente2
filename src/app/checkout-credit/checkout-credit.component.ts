import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { CheckoutPassService } from "../services/checkout-pass.service"
import { CreditCard } from "../models/credit-card";
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-checkout-credit',
  templateUrl: './checkout-credit.component.html',
  styleUrls: ['./checkout-credit.component.css']
})
export class CheckoutCreditComponent implements OnInit {

  creditCardFormGroup: FormGroup;
  creditCard: CreditCard;
  user : User;

  //todo Form Validation : https://angular.io/guide/form-validation

  constructor(
    public checkoutPassService: CheckoutPassService,
    private router: Router,
    private fb: FormBuilder) {
    this.creditCardFormGroup = this.fb.group({
      firstName: new FormControl(''),
      name: new FormControl(''),
      number: new FormControl(''),
      cvv: new FormControl(''),
      expirationMonth: new FormControl(''),
      expirationYear: new FormControl('')
    });
  }

  ngOnInit() {
    this.user = this.checkoutPassService.user;
  }

  public onSubmit() {
    //INSERT INTO CREDIT_CARD VALUES 
    // (5105823505096154, '180.21', 10000,1,2020,'123',4);
    
    /* user 4 : (3, 
    '22233333', 
    '$2a$10$vsMf.RQM/cg3nUjoYU8WH.bB9abGYVeE/rmSPLZ3UAR6/WksudUUu', 
    'USER', 
    1, 
    'Jean-Michel', 
    'Benoit', FALSE, NULL, 'jmb@tecsys.com') */
    if (this.creditCardFormGroup.valid) {
      var tmpCreditCard =  new CreditCard(this.creditCardFormGroup.value);
      
      console.log(tmpCreditCard);
      this.checkoutPassService.setPreauthCredit(tmpCreditCard);
      this.checkoutPassService.creditCard = tmpCreditCard;
      this.router.navigate(["checkout-recap"]);
    }
  }
}
