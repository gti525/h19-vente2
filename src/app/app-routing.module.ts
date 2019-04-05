import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './gestion-admin/admin/admin.component';
import { HomeComponent } from './home/home.component';
import { CheckoutRecapComponent } from './checkout-recap/checkout-recap.component';
import { CheckoutConfirmationComponent } from './checkout-confirmation/checkout-confirmation.component';
import { CartComponent } from './cart/cart.component';
import { ShowDetailComponent } from './show-detail/show-detail.component';
import { CheckoutClientInformationComponent } from './checkout-client-information/checkout-client-information.component';
import { CheckoutCreditComponent } from './checkout-credit/checkout-credit.component'
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './gestion-admin/_guards';

const routes: Routes = [
  { path: '', redirectTo: 'home' , pathMatch:'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'checkout-recap', component: CheckoutRecapComponent },
  { path: 'checkout-confirmation', component: CheckoutConfirmationComponent },
  { path: "cart", component: CartComponent },
  { path: 'checkout-client-information', component: CheckoutClientInformationComponent },
  { path: 'checkout-credit', component: CheckoutCreditComponent },
  { path: "show/:id", component: ShowDetailComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
