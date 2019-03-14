import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './gestion-admin/page-admin/page-admin.component';
import { CheckoutRecapComponent } from './checkout-recap/checkout-recap.component';
import { CheckoutConfirmationComponent } from './checkout-confirmation/checkout-confirmation.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutClientInformationComponent } from './checkout-client-information/checkout-client-information.component';

import { ShowDetailComponent } from './show-detail/show-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutCreditComponent } from './checkout-credit/checkout-credit.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

// used to create fake backend
import { fakeBackendProvider } from './gestion-admin/_helpers';
import { BasicAuthInterceptor, ErrorInterceptor } from './gestion-admin/_helpers';
import { DocsApiComponent } from './docs-api/docs-api.component';

const appRoutes : Routes = [
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
    DocsApiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
