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
    public event: Event;
    urlValue: any;
    private oldUrlImg: string;
    //http://paroissescathedraletoulouse.fr/wp-content/uploads/2016/09/BAPTEME-2-.jpg

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
        //this.getSingleEventById(idSpectacle, this.urlValue);
        //alert(idSpectacle);
        this.eventService.updateEvent(idSpectacle, this.urlValue);
    }

    onKey(event)
    {
        if (event.key === "Enter") {
            this.urlValue = event.target.value;
        }
    }

    getSingleEventById(id:number, newURL: string) {
        this.eventService.getEventById(id).subscribe((res : Event)=>{
        console.log("res : " , res);
        this.oldUrlImg = res.image;
        res.image = newURL;
        this.event = res;
      });
    }

    annulerMAJ(id)
    {
        alert(id);
    }
    
}
