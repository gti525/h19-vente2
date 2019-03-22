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
    private router : Router
  ) { }

  ngOnInit() {
    this.getShows();
  }

  getShows() {
  	this.eventService.getEvents().subscribe((res : Event[])=>{
      this.events = res;
    });
  }

  onShowClick(event: Event) {
    //console.log(show.id);
    this.router.navigate(['/show',event.id]);
  }

  login() {
    this.router.navigate(['/login']);
  }

}