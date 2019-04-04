import { Component, OnInit } from "@angular/core";
import { EventService } from "src/app/event.service";
import { Event } from "src/app/models/event";

import { HttpClient, HttpHeaders } from '@angular/common/http';


export interface RegisterResponse {
  data: {

  };

}

@Component({
  selector: "admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  public events: Event[] = [];
  public event: Event;
  urlValue: any;
  selectedFile: File;

  constructor(
    private http: HttpClient,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.eventService.getEvents().subscribe((res: Event[]) => {
      this.events = res;
    });
  }

  updateEvent(idSpectacle, inputid) {

    var inpuTxt = document.getElementById(inputid) as HTMLInputElement;
    this.eventService.updateEvent(idSpectacle, inpuTxt.value).subscribe(
      data => {
        this.getEvents();
      },
      error => {
        alert("La mise à jour à raté");

      }
    );

  }

  onKey(event) {
    if (event.key === "Enter") {
      this.urlValue = event.target.value;
    }
  }

  // imgur authorization
  // client id :e5063ac6584a8b8
  // api secret : 4e24013760bf9b3c7eec065849cf79aeef718267


  onFileChanged(event, idSpectacle) {

    this.selectedFile = event.target.files[0]
    var clientid = "e5063ac6584a8b8";
    var headers = new HttpHeaders({ 'authorization': `Client-ID ${clientid}` });
    this.http.post('https://api.imgur.com/3/image', this.selectedFile, { headers: headers }).subscribe(res => {
      var response: any = res as any;
      this.eventService.updateEvent(idSpectacle, response.data.link).subscribe(
        data => {
          this.getEvents();
        },
        error => {
          alert("La mise à jour à raté");

        });
    });

    /* from imgur res.data
    account_id: 0
    account_url: null
    ad_type: 0
    ad_url: ""
    animated: false
    bandwidth: 0
    datetime: 1554395948
    deletehash: "UmX6XCoyifMHTUC"
    description: null
    edited: "0"
    favorite: false
    has_sound: false
    height: 725
    id: "Jfye3uz"
    in_gallery: false
    in_most_viral: false
    is_ad: false
    link: "https://i.imgur.com/Jfye3uz.jpg"
    name: ""
    nsfw: null
    section: null
    size: 62298
    tags: []
    title: null
    type: "image/jpeg"
    views: 0
    vote: null
    width: 839
    */
  }




}
