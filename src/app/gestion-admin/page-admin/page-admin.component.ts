import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';
import { Event } from '../../models/event';
import { EventService } from '../../event.service';

@Component({
    selector: 'page-admin',
    templateUrl: './page-admin.component.html',
    styleUrls: ['./page-admin.component.css']
})
export class AdminComponent implements OnInit {
    users: User[] = [];
    events: Event[] = [];

    constructor(
        private userService: UserService,
        private eventService: EventService
    ) {}

    ngOnInit() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
        console.log(this.getSpec());
    }

    getSpec() {
        this.eventService.getEvents().subscribe((res : Event[])=>{
        this.events = res;     
      });
    }
}
