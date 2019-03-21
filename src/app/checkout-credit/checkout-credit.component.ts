import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { CheckoutPassService } from "../services/checkout-pass.service"
import { CreditCard } from "../models/credit-card";
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkout-credit',
  templateUrl: './checkout-credit.component.html',
  styleUrls: ['./checkout-credit.component.css']
})
export class CheckoutCreditComponent implements OnInit {

  creditCardFormGroup: FormGroup;
  creditCard: CreditCard;

  //todo Form Validation : https://angular.io/guide/form-validation

  constructor(
    public checkoutPassService: CheckoutPassService,
    private router: Router,
    private fb: FormBuilder) {
    this.creditCardFormGroup = this.fb.group({
      name: new FormControl(''),
      number: new FormControl(''),
      cvv: new FormControl(''),
      expirationMonth: new FormControl(''),
      expirationYear: new FormControl('')
    });
  }

  ngOnInit() {
  }

  public onSubmit() {
    this.checkoutPassService.creditCard = new CreditCard(this.creditCardFormGroup.value);
    this.router.navigate(["checkout-recap"]);
  }
}
