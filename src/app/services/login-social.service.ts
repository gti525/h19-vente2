import { Injectable } from '@angular/core';
import { LoginSocial } from '../models/login-social';

import axios from "axios";
import { AxiosInstance } from "axios";
import { Ticket } from 'webserver/src/entity/Ticket';


@Injectable({
  providedIn: 'root'
})
export class LoginSocialService {

  apiURL = 'https://vente2-gti525.herokuapp.com/api';
  //apiURL = 'http://localhost:8080/api';

  private axiosClient: AxiosInstance;


  constructor() {

    this.axiosClient = axios.create({
      timeout: 3000,
      headers: {
        "Content-Type": "application/json"
      }
    });

  }/*
  {
    "email": "vente2@vente.com",
    "password": "123",
    "firstName": "Vente2",
    "lastName": "2",
    "birthDate": "1991-01-02T00:00:00",
    "address": "456",
    "city": "Birmanie",
    "postalCode": "j0j0j0",
    "province": "QC",
    "country": "CAN",
    "profileImage": "/user"
  }*/
  /* user for vente 2
  {
    "Id": 3,
    "Email": "vente2@vente.com",
    "Password": "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
    "FirstName": "Vente2",
    "LastName": "2",
    "BirthDate": "1991-01-02T00:00:00",
    "Address": "456",
    "City": "Birmanie",
    "PostalCode": "j0j0j0",
    "Province": "QC",
    "Country": "CAN",
    "ProfileImage": "/user",
    "Friends": null,
    "Tickets": null,
    "Token": null,
    "IsPremium": false
}
  */
  public postLogin(loginSocial: LoginSocial) {
    
    return this.axiosClient.post(this.apiURL + '/social/client/login', {
      email: loginSocial.email,
      password: loginSocial.password
    })
  }

  public postTicket(ticket: Ticket, userSocial: any ){
    
    return this.axiosClient.post('https://core-api-525.herokuapp.com/api/social/client/login', {
      
      "EventName":ticket.event.title,
      "Artist":ticket.event.artist,
      "Date":ticket.event.dateEvent,
      "Location":ticket.event.venue.address,
      "ClientId":userSocial.id,
      "uuid": this.makeid(10)
    })
  }

  private makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  
}



