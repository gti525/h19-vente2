import { Component, OnInit } from '@angular/core';
import { Show, SHOWS } from '../types/show';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements OnInit {

  show : Show;
  //https://angular-2-training-book.rangle.io/handout/routing/routeparams.html
  id : number;
  private sub : any;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      this.show = SHOWS.find(x => x.id == this.id)
   });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
