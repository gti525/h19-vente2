import { Injectable } from '@angular/core';
import { CreditCard } from "../models/credit-card";
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
  private preAuthCredit: any;
  private axiosClient: AxiosInstance;
  private transactionPreAuth: any;

  apiURL = 'https://h19-passerelle.herokuapp.com/api/v1';

  constructor() {
    /*this.axiosClient = axios.create({
      timeout: 3000,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
      //headers: {
        //"Content-Type": "application/json"
        //"Access-Control-Allow-Origin":"*"
      //}
    });*/
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
    this.userSocial = userSocial;

  }

  getUserSocial() {
    return this.userSocial;
  }

  setPreauthCredit(crediCard: CreditCard) {
    /* exemple credit-card

    Jean-Michel
    Benoit
    5105823505096154
    1
    2020
    123
    */
    var postData: any =
    {
      "MERCHANT_API_KEY": "HJoMststlPWjtosFtFG85Q3DdS5/v/8Db2jjPkssN6U=",
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

    axios.post(this.apiURL + '/transaction/create', postData)
      .then(res => {
        console.log("response : ", res);
        this.transactionPreAuth = res.data;
        
        /* exemple response :
          {
            "transaction_number": "3330382145",
            "result": "SUCCESS"
          }
        */
      })
      .catch(err => {
        console.log("error : ", err);
      });

  }

  confirmTransaction() {

    var postData: any =
    {
      "transaction_number": "3330382145", //this.transactionPreAuth.transaction_number,
      "action": "CONFIRM",
      "MERCHANT_API_KEY": "HJoMststlPWjtosFtFG85Q3DdS5/v/8Db2jjPkssN6U="
    };

    console.log(postData);

    axios.post(this.apiURL + '/transaction/process', postData)
      .then(res => {
        console.log("response : ", res);
      })
      .catch(err => {
        console.log("error : ", err);
      });

  }


}
