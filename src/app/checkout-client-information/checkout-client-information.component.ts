import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CheckoutPassService } from "../services/checkout-pass.service";
import { LoginSocialComponent } from "../login-social/login-social.component";

import { User } from "../models/user";
import { from } from 'rxjs';

@Component({
  selector: 'app-checkout-client-information',
  templateUrl: './checkout-client-information.component.html',
  styleUrls: ['./checkout-client-information.component.css']
})
export class CheckoutClientInformationComponent implements OnInit {

  user: User;
  userFormGroup: FormGroup;
  userSocial: any;


  constructor(
    public checkoutPassService: CheckoutPassService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog) {
    this.userFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      civicAddress: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      province : new FormControl('', Validators.required),
      postalCode : new FormControl('', Validators.required)
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginSocialComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        console.log("from client-information : ", result);
        this.checkoutPassService.setUserSocial(result) ;
        this.router.navigate(["checkout-credit"]);
      }
    });
  }

  onSoumettre() {
    if (this.userFormGroup.valid) {
      this.checkoutPassService.user = new User(this.userFormGroup.value);
      this.router.navigate(["checkout-credit"]);
    }
  }

  ngOnInit() {
    
  }

}
