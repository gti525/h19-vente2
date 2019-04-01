import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from './models/event';

let API_URL: string;
if (process.env.API_URL) {
  API_URL = process.env.API_URL;
} else {
  API_URL = "https://vente2-gti525.herokuapp.com/api";
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  apiURL = API_URL;

  constructor(private httpClient: HttpClient) {}

  public getEventById(id: number){
    return this.httpClient.get(`${this.apiURL}/events/${id}`);
  }

  public getEvents(){
    return this.httpClient.get(this.apiURL +  '/events');
  }

  public updateEvent(id: number, newUrlImg: string) {

    return this.httpClient.patch(`${this.apiURL}/events/${id}`,
                          {
                          "image":  newUrlImg
                          })
                          .subscribe(data  => {
                                    alert("Mise à jour réussie !");
                                    console.log("PATCH Request is successful ", data);
                          },
                          error  => {
                          console.log("Que se passe-t-il ? ", error);
                        }
                        );
  }

}
