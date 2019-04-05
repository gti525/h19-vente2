/// <reference types="@types/googlemaps" />
import { Component, OnInit, Inject } from "@angular/core";
import { ShowDetailComponent } from "../show-detail/show-detail.component";
import { MapsAPILoader } from "@agm/core";

@Component({
  selector: "app-google-maps",
  templateUrl: "./google-maps.component.html",
  styleUrls: ["./google-maps.component.css"]
})
export class GoogleMapsComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public zoom: number;
  public eventAdress: string;
  public scrollwheel: boolean;
  public result: number[];

  constructor(
    @Inject(ShowDetailComponent) private showDetail: ShowDetailComponent,
    private mapsAPILoader: MapsAPILoader
  ) { }

  ngOnInit() {
    this.latitude = 45.49603;
    this.longitude = -73.56947839999998;
    this.zoom = 15;
    this.scrollwheel = false;
    this.setEventAddress();
  }

  setEventAddress() {
    this.eventAdress = this.showDetail.event.venue.address;
  }

  mapReady($event: any) {
    // console.log($event);
    this.mapsAPILoader.load().then(() => this.getCoordinatesForPlace(this.eventAdress, $event));
  }

  getCoordinatesForPlace(address: string, map: any) {
    // console.log(map);
    const placeService = new google.maps.places.PlacesService(map);
    const placeRequest = {fields: ["geometry.location"], query: this.eventAdress};

    placeService.findPlaceFromQuery(placeRequest, this.placeResultCallback);
  }

  placeResultCallback = function (placeResult: google.maps.places.PlaceResult[],
                                  placeServiceStatus: google.maps.places.PlacesServiceStatus)  {
    if (placeResult.length !== 0 && placeServiceStatus === google.maps.places.PlacesServiceStatus.OK) {
      const result = [placeResult[0].geometry.location.lat(), placeResult[0].geometry.location.lng()];
      console.log(result[0], result[1]);
    }
  };

}
