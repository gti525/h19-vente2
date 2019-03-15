import { Injectable } from '@angular/core';
import { LoginSocial } from '../models/login-social';
import { throwError } from 'rxjs';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


import axios from "axios";
import { AxiosInstance } from "axios";


@Injectable({
  providedIn: 'root'
})
export class LoginSocialService {

  //apiURL = 'https://vente2-gti525.herokuapp.com/api';
  apiURL = 'http://localhost:8080/api';

  private axiosClient: AxiosInstance;

  // ajouter auth token lorsqu'ils nous le donneront, si y'en a un...
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  mockReq = {

    'email': 'lala',
    'password': 'lele'
  }

  constructor(private httpClient: HttpClient) {

    this.axiosClient = axios.create({
      timeout: 3000,
      headers: {
        "Content-Type": "application/json"
      }
    });

  }



  public postLogin(loginSocial: LoginSocial) {
    return axios.post(this.apiURL + '/social/client/login', {
      email: loginSocial.email,
      password: loginSocial.password
    })
  }


  handleError(error) {
    let errorMessage = '';
    console.log(error.body);
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.body.status}\nMessage: ${error.body.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}



