import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event';
import { EventService } from '../event.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public events: Event[] = [];

  constructor(
    private eventService: EventService,
    private router: Router) {

  }

  ngOnInit() {
    this.getShows();
    this.ngafterviewinit();
    this.eventService.setHomeComponent(this);
  }

  getShows() {

    if (this.eventService.fromSearchResult) {
      this.events = this.eventService.getSearchResults();
      this.eventService.fromSearchResult = false;
    }
    else {
      this.eventService.getEvents().subscribe((res: Event[]) => {
        this.events = res;
      });
    }
  }

  onShowClick(event: Event) {
    //console.log(show.id);
    this.router.navigate(['/show', event.id]);
  }

  login() {
    this.router.navigate(['/login']);
  }

  ngafterviewinit() {
    document.addEventListener("DOMContentLoaded", function () { const e = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY0LCJpYXQiOjE1NTMyOTA1OTJ9.rzTQxpXHOedSfEtC3zgDkwifhTQj50gornz99vNQwAA"; const t = function () { if ("undefined" != typeof Storage && localStorage.getItem("gti525analytic")) { const e = JSON.parse(localStorage.getItem("gti525analytic")); if (new Date(e.expiration).getTime() > (new Date).getTime()) return e.clientId } return }(); t ? function (t) { let n = new XMLHttpRequest; n.open("GET", "https://gti525-analitycs.herokuapp.com/api/v1/banners/code", !0), n.onload = function (o) { 4 === n.readyState && 200 === n.status && Function(`return (${n.responseText})`)()(t, e) }, n.setRequestHeader("x-access-token", e), n.send() }(t) : function () { let t = new XMLHttpRequest; t.open("GET", "https://gti525-analitycs.herokuapp.com/api/v1/analytics/code", !0), t.onload = function (n) { 4 === t.readyState && 200 === t.status && Function(`return (${t.responseText})`)()(e) }, t.setRequestHeader("x-access-token", e), t.send() }() }, !1);
  }

  notify() {
    this.events = this.eventService.getSearchResults();
  }

}