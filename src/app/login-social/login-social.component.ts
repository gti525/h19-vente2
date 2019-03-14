
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
//import { DialogData } from '../DialogData';

// guide on modals for angular 7
// https://appdividend.com/2019/02/11/angular-modal-tutorial-with-example-angular-material-dialog/

@Component({
  selector: 'app-login-social',
  templateUrl: './login-social.component.html',
  styleUrls: ['./login-social.component.css']
})
export class LoginSocialComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<LoginSocialComponent>, 
    @Inject(MAT_DIALOG_DATA) public  data:  any ) { 
    }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
