import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators, EmailValidator } from '@angular/forms';
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
  submitted:boolean = false;

  constructor(
    public checkoutPassService: CheckoutPassService,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog) {
    
  }

  ngOnInit() {
    this.userFormGroup = this.formBuilder.group({
      name: ['', [ 
        Validators.required,
        Validators.minLength(3)
      ]],
      firstName: ['', [ 
        Validators.required,
        Validators.minLength(3)
      ]],
      email: ['', [ 
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]],
      civicAddress: ['',  [  
        Validators.required
      ]],
      city:['', [ Validators.required]],
      province : ['', [ Validators.required]],
      postalCode : ['',  [
        Validators.required,
        Validators.pattern(/^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z][0-9][ABCEGHJ-NPRSTV-Z][0-9]$/)
      ]]
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
    this.submitted = true;

    if (this.userFormGroup.invalid) {
      return;
  }

    if (this.userFormGroup.valid) {
      this.checkoutPassService.user = new User(this.userFormGroup.value);
      this.router.navigate(["checkout-credit"]);
    }
  }

  

}
