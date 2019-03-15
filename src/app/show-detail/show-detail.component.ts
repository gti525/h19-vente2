import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../models/event';
import { EventService } from '../event.service';
import { CartService } from '../cart.service';

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
    private cartService: CartService, 
    private route: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 
      this.getSingleEventById(this.id);
      // (+) converts string 'id' to a number
   });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getSingleEventById(id:number) {
  	this.eventService.getEventById(id).subscribe((res : Event)=>{
      this.event = res;
    });
  }

  onAddClick() {
    this.cartService.addTicket(this.event).subscribe(() => {
      this.router.navigate(['/cart']);
    });
  }
}
