
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LoginSocialService } from '../services/login-social.service';
import { LoginSocial } from '../models/login-social';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
//import { Observable } from 'rxjs/Observable';

import {
   HttpErrorResponse
} from "@angular/common/http";
import { HttpClient } from 'selenium-webdriver/http';


//import { DialogData } from '../DialogData';

// guide on modals for angular 7
// https://appdividend.com/2019/02/11/angular-modal-tutorial-with-example-angular-material-dialog/

@Component({
  selector: 'app-login-social',
  templateUrl: './login-social.component.html',
  styleUrls: ['./login-social.component.css']
})
export class LoginSocialComponent implements OnInit {

  //public loginSocial: LoginSocial;
  response : any;
  error : any = "not dead";

  constructor(
    public dialogRef: MatDialogRef<LoginSocialComponent>, 
    private loginSocialService: LoginSocialService,
    private router : Router,
    @Inject(MAT_DIALOG_DATA) public  loginSocial:  LoginSocial ) { 
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  onConnect(): void {

     console.log(this.loginSocial);
     this.loginSocialService.postLogin(this.loginSocial);
    // .subscribe(
    //   res  => {
    //     console.log(res);
    //         //this.dialogRef.close();
    //         //this.router.navigate(['/checkout-credit']);

    //   }, error => {
    //     console.log(error.response);
    //     if(error == "Not Found"){
    //       console.log("hello");
    //     }
    //   },
    //   () => {

    //   }
    // );

  }


  ngOnInit() {
  }

}
