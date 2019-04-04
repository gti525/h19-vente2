import { Component, OnInit } from "@angular/core";
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

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe((res: Event[]) => {
      this.events = res;
    });
  }

  updateEvent(idSpectacle, inputid) {

    var inpuTxt = document.getElementById(inputid) as HTMLInputElement;
    this.eventService.updateEvent(idSpectacle, inpuTxt.value);
  }

  onKey(event) {
    if (event.key === "Enter") {
      this.urlValue = event.target.value;
    }
  }

}
