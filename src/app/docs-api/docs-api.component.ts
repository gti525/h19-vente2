import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-docs-api',
  templateUrl: './docs-api.component.html',
  styleUrls: ['./docs-api.component.css']
})
export class DocsApiComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    // Couldn't make Swagger UI work; hacking it.
    document.location.href = "https://app.swaggerhub.com/apis-docs/francisdevizio/gti525-h19-vente2/1.0.0";
  }

}
