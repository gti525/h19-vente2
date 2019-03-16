import { Injectable } from '@angular/core';
import { CreditCard } from "../models/credit-card";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class CheckoutPassService {

  public creditCard: CreditCard;
  public user: User;
  //private because must be set through setUserSocial
  private userSocial: any;

  constructor() { }

  setUserSocial(userSocial : any){
    //reset the user just in case
    this.user = new User();
    this.user.firstName = userSocial.FirstName;
    this.user.name = userSocial.LastName;
    this.user.postalCode = userSocial.PostalCode;
    this.user.province = userSocial.Province;
    this.user.city = userSocial.City;
    this.user.civicAddress = userSocial.Address;
    this.userSocial = userSocial;
  }

  getUserSocial(){
    return this.userSocial;
  }
}
