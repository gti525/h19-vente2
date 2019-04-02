import { Injectable } from '@angular/core';
import { LoginSocial } from '../models/login-social';

import axios from "axios";
import { AxiosInstance } from "axios";
import { Ticket } from '../models/ticket';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginSocialService {

  //apiURL = 'https://vente2-gti525.herokuapp.com/api';
  //apiURL = 'http://localhost:8080/api';
  apiURL = 'https://core-api-525.herokuapp.com/api';
  private ourApiURL = environment.API_URL;

  private axiosClient: AxiosInstance;


  constructor() {

    this.axiosClient = axios.create({
      // timeout: 3000,
      headers: {
        "Content-Type": "application/json"
      }
    });

  }
  /* 
    Notre compte dans la bd de social: 

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

    return this.axiosClient.post(this.apiURL + '/client/login', {
      email: loginSocial.email,
      password: loginSocial.password
    })
  }

  public postTicket(ticket: Ticket, userSocial: any) {

    var eventreceived;

    this.axiosClient.get(this.ourApiURL + "/events/" + ticket.event.id)
      .then(res => {
        console.log("received event from our API : ", res);
        eventreceived = res.data;





      })
      .catch(err => {
        console.log("Did not receive event from our API : ", err);
      });

      
    var postData: any =
    {
      "EventName": ticket.event.title,
      "Artist": ticket.event.artist,
      "Date": ticket.event.dateEvent,
      "Location": eventreceived.venue.id,
      "ClientId": userSocial.id,
      "uuid": ticket.uuid
    };

    this.axiosClient = axios.create({
      // timeout: 3000,
      headers: {
        "Authorization": `Bearer ${userSocial.Token}`,
        "Content-Type": "application/json"
      }
    });
    console.log("Posting to social : ", postData);

    return this.axiosClient.post('https://core-api-525.herokuapp.com/api/Ticket',
      postData);
  }

  //Pour si on veut tester avec des faux uuid.
  private makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

}



