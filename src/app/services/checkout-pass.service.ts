import { Injectable } from '@angular/core';
import { CreditCard } from "../models/credit-card";
import { Transaction } from "../models/transaction";
import { ShowCart, Cart } from '../models/cart';
import { User } from "../models/user";
import axios from "axios";
import { AxiosInstance } from "axios";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CheckoutPassService {

  public creditCard: CreditCard;
  public user: User;
  //private because must be set through setUserSocial
  private userSocial: any;
  public cart: Cart = new Cart();
  public showCart: ShowCart;
  private preAuthCredit: any;
  private axiosClient: AxiosInstance;
  transaction: Transaction;

  private passerelleApiURL = 'https://h19-passerelle.herokuapp.com/api/v1';
  private ourApiURL = environment.API_URL;
  private MERCHANT_API_KEY = "HJoMststlPWjtosFtFG85Q3DdS5/v/8Db2jjPkssN6U=";

  constructor() {

  }


  /**
   * Sets this userSocial for the rest of the process.
   * If a User is set from this method, the rest of the checkout will
   * take account for that by sending API calls to Saucial
   *
   * @param userSocial
   */

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

  /**
   * Preauthorize the creditCard for the content of this.cart total
   *
   * @param crediCard the credit card to preauthorize
   */

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
      "amount": this.calculateTotal(this.cart),
      "purchase_desc": "PURCHASE/ Vente2 ",
      "credit_card": {
        "first_name": crediCard.firstName,
        "last_name": crediCard.name,
        "number": Number(crediCard.number),
        "cvv": crediCard.cvv,
        "exp": {
          "month": Number(crediCard.expirationMonth),
          "year": Number(crediCard.expirationYear)
        }
      }
    };

    console.log(postData);

    return axios.post(this.passerelleApiURL + '/transaction/create', postData)

  }
  /**
   * Sends the COMMIT to passerelle de paiement API to proceed with transaction
   */
  commitTransaction() {

    var postData: any =
    {
      "transaction_number": this.preAuthCredit.transaction_number, //this.transactionPreAuth.transaction_number,
      "action": "COMMIT",
      "MERCHANT_API_KEY": this.MERCHANT_API_KEY
    };

    console.log(postData);

    return axios.post(this.passerelleApiURL + '/transaction/process', postData)
  }



  /** commit the transaction to our api by creating a new transaction containing
   *  the ticket
   */
  commitTransactionToOurAPI() {

    this.transaction = new Transaction();
    this.transaction.transactionConfirmation = this.makeid(16);
    this.transaction.dateTransaction = new Date(Date.now());
    this.transaction.user = this.user;


    var postData: any = {
      "transactionConfirmation": this.transaction.transactionConfirmation,
      "tickets": [],
      "user": {
        "name": this.user.firstName,
        "surname": this.user.name
      }
    }

    if(this.userSocial){
      postData.user.socialLink = this.userSocial.Email;
    }

    this.cart.tickets.forEach(ticket => {
      postData.tickets.push({"uuid" : ticket.uuid});
    });

    return axios.post(this.ourApiURL + '/transactions', postData)
  }

  //make an alpha-numeric string of lenth size
  private makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  setPreauthCredit(preauth: any) {
    this.preAuthCredit = preauth;
  }

  calculateTotal(cart) {
		var total = 0.0;
		if (cart.tickets) {
			cart.tickets.forEach(function (ticket) {
				total += Number(ticket.price);
			})
		}

		return total;
	}

}
