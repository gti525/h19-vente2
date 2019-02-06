import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutRecapComponent } from './checkout-recap/checkout-recap.component';

const routes: Routes = [
  { path: 'checkout-recap', component: CheckoutRecapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
