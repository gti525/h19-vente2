import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'billets',
  templateUrl: './billets.component.html',
  styleUrls: ['./billets.component.css']
})

export class BilletsComponent implements OnInit {
    public events: Event[] = [];
    urlValue: any;

    constructor(
        private eventService: EventService,
        private router : Router
    ) {}

    ngOnInit() {
        this.eventService.getEvents().subscribe((res : Event[])=>{
            this.events = res;
          });
    }

    updateEvent(idSpectacle) {
        //alert(this.urlValue);
        this.eventService.updateEvent(idSpectacle, this.urlValue);
    }

    onKey(event)
    {
        if (event.key === "Enter") {
            this.urlValue = event.target.value;
        }
    }
}
