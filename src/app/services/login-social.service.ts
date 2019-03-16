import { Injectable } from '@angular/core';
import { LoginSocial } from '../models/login-social';

import axios from "axios";
import { AxiosInstance } from "axios";


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

  }

  public postLogin(loginSocial: LoginSocial) {
    
    return this.axiosClient.post(this.apiURL + '/social/client/login', {
      email: loginSocial.email,
      password: loginSocial.password
    })
  }
}



