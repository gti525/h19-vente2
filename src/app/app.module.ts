import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutRecapComponent } from './checkout-recap/checkout-recap.component';
import { CheckoutConfirmationComponent } from './checkout-confirmation/checkout-confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckoutRecapComponent,
    CheckoutConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
