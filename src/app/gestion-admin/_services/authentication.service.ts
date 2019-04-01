import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

let API_URL: string;
if (process.env.API_URL) {
  API_URL = process.env.API_URL;
} else {
  API_URL = "https://vente2-gti525.herokuapp.com/api";
}

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const request_headers = new HttpHeaders({
      Authorizaton: `Basic ${username}:${password}`
    });
    return this.http
      .post<any>(`${API_URL}/admins/_login`, null, { headers: request_headers })
      .pipe(
        map(user => {
          // login successful if there's a user in the response    ${config.apiUrl}
          if (user) {
            // store user details and basic auth credentials in local storage
            // to keep user logged in between page refreshes
            user.authdata = window.btoa(username + ":" + password);
            localStorage.setItem("currentUser", JSON.stringify(user));
          }

          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
  }
}
