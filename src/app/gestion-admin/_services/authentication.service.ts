import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment.prod";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const request_headers = new HttpHeaders({
      Authorizaton: `Basic ${username}:${password}`
    });
    return this.http
      .post<any>(`${environment.API_URL}/admins/_login`, null, { headers: request_headers })
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
