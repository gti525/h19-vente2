import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../models/event';
import { EventService } from '../event.service';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements OnInit {

  event : Event;
  //https://angular-2-training-book.rangle.io/handout/routing/routeparams.html
  id : number;
  private sub : any;

  constructor(
    private eventService: EventService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.event = this.getSingleEventById(this.id);
      this.show = SHOWS.find(x => x.id == this.id)
   });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getSingleEventById(id:number) {
  	this.eventService.getEventById(id).subscribe((res : Event)=>{
      return res;     
    });
  }

  getVenueSingleVenue(id:number) {
    return {description: "nice venue mate"};
  	this.eventService.getEventById(id).subscribe((res : Event)=>{
      return res;     
    });
  }
}
