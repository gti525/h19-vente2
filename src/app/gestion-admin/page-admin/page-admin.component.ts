import { Component, OnInit } from '@angular/core';

import { User } from '../_models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';

@Component({
    selector: 'page-admin',
    templateUrl: './page-admin.component.html',
    styleUrls: ['./page-admin.component.css']
})
export class AdminComponent implements OnInit {
    users: User[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private router : Router
    ) {}

    ngOnInit() {

    }

    charger() {

    }
}
