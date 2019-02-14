import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ShowCardComponent } from './show-card/show-card.component';
import { CheckoutRecapComponent } from './checkout-recap/checkout-recap.component';
import { CheckoutConfirmationComponent } from './checkout-confirmation/checkout-confirmation.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutClientInformationComponent } from './checkout-client-information/checkout-client-information.component';

import { ShowDetailComponent } from './show-detail/show-detail.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes : Routes = [
  {path: 'checkout-client-information', component: CheckoutClientInformationComponent},
  {path: 'home', component: HomeComponent},
  {path: '', component: CheckoutClientInformationComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ShowCardComponent,
    CheckoutRecapComponent,
    CheckoutConfirmationComponent,
    CartComponent,
    CheckoutClientInformationComponent,
    ShowDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
