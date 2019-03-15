import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event';
import { EventService } from '../event.service';

@Component({
  selector: 'billets',
  templateUrl: './billets.component.html',
  styleUrls: ['./billets.component.css']
})

export class BilletsComponent implements OnInit {
    public events: Event[] = [];

    constructor(
        private eventService: EventService
    ) {}

    ngOnInit() {
        this.eventService.getEvents().subscribe((res : Event[])=>{
            this.events = res;
          });
    }

    modifier(idBillet: any)
    {
        alert(idBillet);
    }

    supprimer()
    {

    }
}
