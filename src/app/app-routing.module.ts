import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutRecapComponent } from './checkout-recap/checkout-recap.component';
import { CheckoutConfirmationComponent } from './checkout-confirmation/checkout-confirmation.component';

const routes: Routes = [
  { path: 'checkout-recap', component: CheckoutRecapComponent },
  { path: 'checkout-confirmation', component: CheckoutConfirmationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
