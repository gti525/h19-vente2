import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './gestion-admin/admin/admin.component';
import { CheckoutRecapComponent } from './checkout-recap/checkout-recap.component';
import { CheckoutConfirmationComponent } from './checkout-confirmation/checkout-confirmation.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutClientInformationComponent } from './checkout-client-information/checkout-client-information.component';

import { ShowDetailComponent } from './show-detail/show-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutCreditComponent } from './checkout-credit/checkout-credit.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material';


// used to create fake backend
// import { fakeBackendProvider } from './gestion-admin/_helpers';
import { BasicAuthInterceptor, ErrorInterceptor } from './gestion-admin/_helpers';
// import { BilletsComponent } from './billets/billets.component';
import { LoginSocialComponent } from './login-social/login-social.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MinuteSecondsPipe } from './header/minute-seconds.pipe';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { NgxSpinnerModule } from 'ngx-spinner';

const appRoutes: Routes = [
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AdminComponent,
    CheckoutRecapComponent,
    CheckoutConfirmationComponent,
    CartComponent,
    CheckoutClientInformationComponent,
    ShowDetailComponent,
    CheckoutCreditComponent,
    LoginComponent,
    // BilletsComponent,
    LoginSocialComponent,
    MinuteSecondsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule, // or SharedModule that exports MatFormFieldModule,
    MaterialModule,
    BrowserAnimationsModule,
    CreditCardDirectivesModule,
    NgxSpinnerModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginSocialComponent,
  ],
})
export class AppModule { }
