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

  setPreauthCredit(crediCard : CreditCard){
    //reset the user just in case
    //INSERT INTO CREDIT_CARD VALUES 
    // (5105823505096154, '180.21', 10000,1,2020,'123',4);
    
    /* user 4 : (3, 
    '22233333', 
    '$2a$10$vsMf.RQM/cg3nUjoYU8WH.bB9abGYVeE/rmSPLZ3UAR6/WksudUUu', 
    'USER', 
    1, 
    'Jean-Michel', 
    'Benoit', FALSE, NULL, 'jmb@tecsys.com') */

    /*
    Jean-Michel
    Benoit
    5105823505096154
    1
    2020
    123
    */
    var postData:any = 
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
    })
    .catch(err => {
        console.log("error : ", err);
    });
    
  }


}
