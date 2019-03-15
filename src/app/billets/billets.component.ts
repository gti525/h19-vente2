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
    e: any;

    constructor(
        private eventService: EventService,
        private router : Router
    ) {}

    ngOnInit() {
        this.eventService.getEvents().subscribe((res : Event[])=>{
            this.events = res;
          });
    }

    updateEvent(idSpectacle, imgSrc) {
        var test = document.getElementsByTagName('urlIMG')[0];
        alert(test);
        //this.eventService.updateEvent(idSpectacle, imgSrc)
    }

    doSomething(val)
    {
        alert(val.name);
    }
}
