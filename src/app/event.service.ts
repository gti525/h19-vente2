import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Event } from './models/event';
import { HomeComponent } from './home/home.component';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  apiURL = environment.API_URL;
  fromSearchResult = false;

  public events: Event[] = [];
  homeComponent: HomeComponent;

  constructor(private httpClient: HttpClient) { }

  public getEventById(id: number) {
    return this.httpClient.get(`${this.apiURL}/events/${id}`);
  }

  public getEvents() {
    return this.httpClient.get(this.apiURL + '/events');
  }

  public setHomeComponent(homeComponent: HomeComponent) {
    this.homeComponent = homeComponent;
  }

  public searchEvents(term) {
    let params = new HttpParams();
    params = params.append('term', term);
    return this.httpClient.get(this.apiURL + '/events/search?', { params });
  }


  public setSearchResult(receivedEvents: Event[]) {
    this.events = receivedEvents;
    this.fromSearchResult = true;
    this.homeComponent.notify();
  }


  public getSearchResults(): Event[] {
    return this.events;
  }


  public updateEvent(id: number, newUrlImg: string) {

    return this.httpClient.patch(`${this.apiURL}/events/${id}`,
      {
        "image": newUrlImg
      })
      .subscribe(data => {
        alert("Mise à jour réussie !");
        console.log("PATCH Request is successful ", data);
      },
        error => {
          console.log("Que se passe-t-il ? ", error);
        }
      );
  }

}
