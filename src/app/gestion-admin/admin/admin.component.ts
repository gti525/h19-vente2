import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../_services";
import { EventService } from "src/app/event.service";
import { Event } from "src/app/models/event";

@Component({
  selector: "admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  public events: Event[] = [];
  public event: Event;
  urlValue: any;
  private oldUrlImg: string;

  constructor(
    private authenticationService: AuthenticationService,
    private eventService: EventService,
  ) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe((res: Event[]) => {
      this.events = res;
    });
  }

  updateEvent(idSpectacle) {
    //this.getSingleEventById(idSpectacle, this.urlValue);
    //alert(idSpectacle);
    this.eventService.updateEvent(idSpectacle, this.urlValue);
  }

  onKey(event) {
    if (event.key === "Enter") {
      this.urlValue = event.target.value;
    }
  }

  getSingleEventById(id: number, newURL: string) {
    this.eventService.getEventById(id).subscribe((res: Event) => {
      console.log("res : ", res);
      this.oldUrlImg = res.image;
      res.image = newURL;
      this.event = res;
    });
  }

  annulerMAJ(id) {
    alert(id);
  }
}
