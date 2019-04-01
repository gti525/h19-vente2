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
  user: User;
  submitted: boolean = false;
  errorMessage;
  creditCardPreauthPassed: boolean = false;

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
      cvv: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      expirationMonth: ['', [
        Validators.required,
        Validators.pattern(/^[2-9]|1[0-2]?$/)
      ]],
      expirationYear: ['', [
        Validators.required,
        Validators.pattern(/^\b(20[1-4][0-9]|2050)\b$/)
      ]],

    });
  }

  ngOnInit() {
    this.user = this.checkoutPassService.user;
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
      var tmpCreditCard = new CreditCard(this.creditCardFormGroup.value);

      this.checkoutPassService.preauthCredit(tmpCreditCard)
        .then(res => {
          console.log("response : ", res);
          this.checkoutPassService.setPreauthCredit(res.data);
          console.log("response data : " + res.data);
          /* exemple response :
            {
              "transaction_number": "10341278",
              "result": "SUCCESS"
            }
          */
          this.creditCardPreauthPassed = true;
          this.checkoutPassService.creditCard = tmpCreditCard;
          this.router.navigate(["checkout-recap"]);
        })
        .catch(err => {
          if (err.response.status == 400) {
            console.log("error : ", err.response);
            this.errorMessage = "Carte de crédit non valide ou inexistante";
          }
          else {
            this.errorMessage = "Unknown error";
          }
        });
    }
  }
}
