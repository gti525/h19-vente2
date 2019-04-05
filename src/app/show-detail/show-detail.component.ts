import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../models/event';
import { EventService } from '../event.service';
import { CartService } from '../cart.service';
import { HeaderUpdateService } from '../header-update.service';

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
    private headerUpdateService: HeaderUpdateService,
    private route: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 
      this.getSingleEventById(this.id);
      this.ngafterviewinit();
      // (+) converts string 'id' to a number
   });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getSingleEventById(id:number) {
  	this.eventService.getEventById(id).subscribe((res : Event)=>{
      console.log("res : " , res);
      this.event = res;
    });
  }

  onAddClick() {
    this.cartService.addTicket(this.event).subscribe(data => {
      if (!("error" in data) || data["error"] == 2) {
        this.router.navigate(['/cart']);
      } else if (data["error"] == 1) {
        this.headerUpdateService.changeErrorMessage("Le panier est plein (6 billets maximum).");
      } else if (data["error"] == 3) {
        this.headerUpdateService.changeErrorMessage("Il n'y a présentement plus de billets disponibles pour le spectacle. Veuillez réessayer plus tard.");
      }
    });
  }

  ngafterviewinit (){
    document.addEventListener("DOMContentLoaded",function(){const e="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY0LCJpYXQiOjE1NTMyOTA1OTJ9.rzTQxpXHOedSfEtC3zgDkwifhTQj50gornz99vNQwAA";const t=function(){if("undefined"!=typeof Storage&&localStorage.getItem("gti525analytic")){const e=JSON.parse(localStorage.getItem("gti525analytic"));if(new Date(e.expiration).getTime()>(new Date).getTime())return e.clientId}return}();t?function(t){let n=new XMLHttpRequest;n.open("GET","https://gti525-analitycs.herokuapp.com/api/v1/banners/code",!0),n.onload=function(o){4===n.readyState&&200===n.status&&Function(`return (${n.responseText})`)()(t,e)},n.setRequestHeader("x-access-token",e),n.send()}(t):function(){let t=new XMLHttpRequest;t.open("GET","https://gti525-analitycs.herokuapp.com/api/v1/analytics/code",!0),t.onload=function(n){4===t.readyState&&200===t.status&&Function(`return (${t.responseText})`)()(e)},t.setRequestHeader("x-access-token",e),t.send()}()},!1);
  }
}
