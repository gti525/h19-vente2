import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) : Observable < any > {
    const postHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Basic ${username}:${password}`
    });
    return this.http
      .post<any>(`${environment.API_URL}/admins/_login`, null, { headers: postHeaders, observe: "response" })
      .pipe(tap(resp => {
          // display its headers
          // const keys = resp.headers.keys();
          // const headers = keys.map(key => `${key}: ${resp.headers.get(key)}`);
          // access the body directly
          // const body = { ... resp.body };
          // console.log(headers);
          const user = {};
          user["authdata"] = window.btoa(username + ":" + password);
          localStorage.setItem("currentUser", JSON.stringify(user));
          return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
  }
}
