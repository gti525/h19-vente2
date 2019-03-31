import { Injectable } from '@angular/core';
import { CreditCard } from "../models/credit-card";
import {  ShowCart, Cart } from '../models/cart';
import { User } from "../models/user";
import axios from "axios";
import { AxiosInstance } from "axios";

@Injectable({
  providedIn: 'root'
})
export class CheckoutPassService {

  public creditCard: CreditCard;
  public user: User;
  //private because must be set through setUserSocial
  private userSocial: any;
  public cart : Cart;
  public showCart: ShowCart;
  private preAuthCredit: any;
  private axiosClient: AxiosInstance;
  private transactionPreAuth: any;

  apiURL = 'https://h19-passerelle.herokuapp.com/api/v1';
  MERCHANT_API_KEY = "HJoMststlPWjtosFtFG85Q3DdS5/v/8Db2jjPkssN6U=";

  constructor() {
   
  }

  setUserSocial(userSocial: any) {
    //reset the user just in case
    this.user = new User();
    this.user.firstName = userSocial.FirstName;
    this.user.name = userSocial.LastName;
    this.user.postalCode = userSocial.PostalCode;
    this.user.province = userSocial.Province;
    this.user.city = userSocial.City;
    this.user.civicAddress = userSocial.Address;

    //and copy the returned request from social
    this.userSocial = userSocial;

  }

  getUserSocial() {
    return this.userSocial;
  }

  preauthCredit(crediCard: CreditCard) {
    /* exemple credit-card

    Jean-Michel
    Benoit
    5105749559146043
    1
    2020
    123
    */
    var postData: any =
    {
      "MERCHANT_API_KEY": this.MERCHANT_API_KEY,
      "amount": 100,
      "purchase_desc": "PURCHASE/ Vente2 ",
      "credit_card": {
        "first_name": crediCard.firstName,
        "last_name": crediCard.name,
        "number": crediCard.number,
        "cvv": crediCard.cvv,
        "exp": {
          "month": crediCard.expirationMonth,
          "year": crediCard.expirationYear
        }
      }
    };
    console.log(postData);

    return axios.post(this.apiURL + '/transaction/create', postData)

  }

  commitTransaction() {

    var postData: any =
    {
      "transaction_number": this.transactionPreAuth.transaction_number , //this.transactionPreAuth.transaction_number,
      "action": "COMMIT",
      "MERCHANT_API_KEY": this.MERCHANT_API_KEY
    };  

    console.log(postData);

    return axios.post(this.apiURL + '/transaction/process', postData)
      .then(res => {
        console.log("response : ", res);
      })
      .catch(err => {
        console.log("error : ", err);
      });

  }

  setPreauthCredit(preauth : any){
    this.preAuthCredit = preauth;
  }

}
