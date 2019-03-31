import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { CheckoutPassService } from "../services/checkout-pass.service"
import { CreditCard } from "../models/credit-card";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from '../models/user';
import { CreditCardValidator } from 'angular-cc-library';

@Component({
  selector: 'app-checkout-credit',
  templateUrl: './checkout-credit.component.html',
  styleUrls: ['./checkout-credit.component.css']
})
export class CheckoutCreditComponent implements OnInit {

  creditCardFormGroup: FormGroup;
  creditCard: CreditCard;
  user : User;
  submitted:boolean = false;

  //todo Form Validation : https://angular.io/guide/form-validation

  constructor(
    public checkoutPassService: CheckoutPassService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.creditCardFormGroup = this.formBuilder.group({
      name: ['', [ 
        Validators.required,
        Validators.minLength(3)
      ]],
      firstName: ['', [ 
        Validators.required,
        Validators.minLength(3)
      ]],
      number: ['', [ 
        Validators.required,
        CreditCardValidator.validateCCNumber
      ]],
      cvv: ['',  [  
        Validators.required,
        Validators.minLength(3)
      ]],
      expirationMonth:['', [ 
        Validators.required,
        Validators.pattern(/^[2-9]|1[0-2]?$/)
      ]],
      expirationYear : ['', [ 
        Validators.required,
        Validators.pattern(/^\b(20[1-4][0-9]|2050)\b$/)
      ]],
      
    });
  }

  ngOnInit() {
    this.user = this.checkoutPassService.user;
  }

  checkLuhn(value) {
    // remove all non digit characters
    var value = value.replace(/\D/g, '');
    var sum = 0;
    var shouldDouble = false;
    // loop through values starting at the rightmost side
    for (var i = value.length - 1; i >= 0; i--) {
      var digit = parseInt(value.charAt(i));
      
      if (shouldDouble) {
        if ((digit *= 2) > 9) digit -= 9;
      }
  
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return (sum % 10) == 0;
  }

  public onSubmit() {

    this.submitted = true;

    if (this.creditCardFormGroup.invalid) {
      return;
    }
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
      this.checkoutPassService.setPreauthCredit(tmpCreditCard);
      this.checkoutPassService.creditCard = tmpCreditCard;
      this.router.navigate(["checkout-recap"]);
    }
  }
}

const validCharacters = /[^\s\w,.:&\/()+%'`@-]/; 

// create your class that extends the angular validator class
export class MonthValidator extends Validators {
  // setup simple regex for white listed characters
  
  // create a static method for your validation
  static validateCharacters(control: FormControl) {
     
    // first check if the control has a value
    if (control.value && control.value.length > 0) {
       
      // match the control value against the regular expression
      const matches = control.value.match(validCharacters);
      
      // if there are matches return an object, else return null.
      return matches && matches.length ? { invalid_characters: matches } : null;
    } else {
      return null;
    }
  }
}