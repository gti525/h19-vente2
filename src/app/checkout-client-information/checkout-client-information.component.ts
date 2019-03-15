import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CheckoutPassService } from "../services/checkout-pass.service"
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginSocialComponent } from '../login-social/login-social.component'

import { User } from "../models/user";


@Component({
  selector: 'app-checkout-client-information',
  templateUrl: './checkout-client-information.component.html',
  styleUrls: ['./checkout-client-information.component.css']
})
export class CheckoutClientInformationComponent implements OnInit {

  user: User;
  userFormGroup: FormGroup;
  animal: string;
  name: string;

  constructor(
    public checkoutPassService: CheckoutPassService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog) {
    this.userFormGroup = this.fb.group({
      name: new FormControl(''),
      firstName: new FormControl(''),
      civicAddress: new FormControl(''),
      city: new FormControl(''),
      province: new FormControl(''),
      postalCode: new FormControl(''),
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginSocialComponent, {
      width: '600px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

  onSoumettre() {
    this.checkoutPassService.user = new User(this.userFormGroup.value);
    this.router.navigate(["checkout-credit"]);
  }

  ngOnInit() {
  }

}
