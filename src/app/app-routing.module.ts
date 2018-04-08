import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ItemGridComponent } from './item-grid/item-grid.component';
import { CustomerComponent } from './customer/customer.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { WhyusComponent } from './whyus/whyus.component';
import { ItemsCartComponent } from './items-cart/items-cart.component';
import { AboutusComponent } from './aboutus/aboutus.component';

const appRoutes: Routes = [
  { path: '', component: ItemGridComponent },
  { path: 'signin', component: CustomerComponent},
  { path: 'placeorder', component: PlaceOrderComponent},
  { path: 'whyus', component: WhyusComponent},
  { path: 'aboutus', component: AboutusComponent},
  { path: 'kart', component: ItemsCartComponent},
  { path: ':crackers', component: ItemGridComponent }

];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
