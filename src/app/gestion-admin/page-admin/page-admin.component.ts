import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';
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
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private router : Router
    ) {}

    ngOnInit() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
        this.charger();
    }

    charger() {
        this.authenticationService.logout();
        this.router.navigate(['/billets']);
      }
}
