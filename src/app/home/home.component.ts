import { Component, OnInit } from '@angular/core';
import { Show } from '../types/show';
import { ShowsService } from '../shows.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	shows: Show[];

  constructor(private showsService: ShowsService) { }

  ngOnInit() {
  	this.getShows();
  }

  getShows() {
  	this.shows = this.showsService.getShows();
  }

  onShowClick(show: Show) {
  	console.log("test");
  }

}
