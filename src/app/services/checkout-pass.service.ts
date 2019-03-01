import { Injectable } from '@angular/core';
import { CreditCard } from "../models/credit-card";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class CheckoutPassService {

  public creditCard: CreditCard;
  public user: User;

  constructor() { }
}
