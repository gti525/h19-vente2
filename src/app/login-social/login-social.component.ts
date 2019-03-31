
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginSocialService } from '../services/login-social.service';
import { LoginSocial } from '../models/login-social';
import { Router } from '@angular/router';



//import { DialogData } from '../DialogData';

// guide on modals for angular 7
// https://appdividend.com/2019/02/11/angular-modal-tutorial-with-example-angular-material-dialog/

@Component({
  selector: 'app-login-social',
  templateUrl: './login-social.component.html',
  styleUrls: ['./login-social.component.css']
})
export class LoginSocialComponent implements OnInit {

  public loginSocial: LoginSocial = {
    email: "",
    password: ""
  };  // used to connect to social
  errorMessage;
  user: any; //returned user from social

  constructor(
    public dialogRef: MatDialogRef<LoginSocialComponent>,
    private loginSocialService: LoginSocialService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConnect(): void {

    this.loginSocialService.postLogin(this.loginSocial)
      .then(res => {
        console.log(res);
        this.user = res.data;
        this.dialogRef.close(this.user);
      })
      .catch(err => {

        this.errorMessage = '';
        if (err.response.data.status == 404) {
          this.errorMessage = " Error : Email and/or Password combination not found";
        }
        else {
          this.errorMessage = " Error : " + err.response.data.title;
        }
      });
  }


  ngOnInit() {
  }

}
