import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CheckoutRecapComponent } from './checkout-recap/checkout-recap.component';
import { CheckoutConfirmationComponent } from './checkout-confirmation/checkout-confirmation.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutClientInformationComponent } from './checkout-client-information/checkout-client-information.component';

import { ShowDetailComponent } from './show-detail/show-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutCreditComponent } from './checkout-credit/checkout-credit.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { GestionImagesComponent } from './gestion-images/gestion-images.component';

const appRoutes : Routes = [
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CheckoutRecapComponent,
    CheckoutConfirmationComponent,
    CartComponent,
    CheckoutClientInformationComponent,
    ShowDetailComponent,
    CheckoutCreditComponent,
    LoginComponent,
    GestionImagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
