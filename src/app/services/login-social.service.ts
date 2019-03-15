import { Injectable } from '@angular/core';
import { LoginSocial } from '../models/login-social';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient,  HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import 'rxjs/add/observable/of';

import axios from "axios";
import { AxiosInstance } from "axios";


@Injectable({
  providedIn: 'root'
})
export class LoginSocialService {
  //apiURL = 'https://core-api-525.herokuapp.com/api/client/login'
  apiURL = 'https://core-api-525.herokuapp.com/api';

  private axiosClient: AxiosInstance;

  // ajouter auth token lorsqu'ils nous le donneront, si y'en a un...
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
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

  
  
  public postLogin(loginSocial: LoginSocial){
    console.log("connecting");
     var  result ;
 

      axios.post(this.apiURL + '/client/login', { email: 'bar', password:'test'})
      .then(res => {
        console.log(res);
        result = res;
      })
      .catch(err => {
        console.log(err.response); 
        console.log(err.response.status);

      });

      return result;

  

   // return this.httpClient.post(this.apiURL + '/client/login', loginSocial, this.httpOptions);   
    
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

  

