import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ItemGridComponent } from './item-grid/item-grid.component';
import { CustomerComponent } from './customer/customer.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { WhyusComponent } from './whyus/whyus.component';
import { ItemsCartComponent } from './items-cart/items-cart.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { BrowseComponent } from './browse/browse.component';
import { OffersComponent } from './offers/offers.component';
import { ProductComponent } from './product/product.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';

const appRoutes: Routes = [
  { path: '', component: ItemGridComponent },
  { path: 'signin', component: CustomerComponent},
  { path: 'placeorder', component: PlaceOrderComponent},
  { path: 'whyus', component: WhyusComponent},
  { path: 'aboutus', component: AboutusComponent},
  { path: 'kart', component: ItemsCartComponent},
  { path: 'myorder', component: MyOrderComponent},
  { path: 'browse', component: BrowseComponent},
  { path: 'OFFERS', component: OffersComponent},
  { path: 'product', component: ProductComponent},
  { path: 'advertisement', component: AdvertisementComponent},
  { path: ':crackers', component: ItemGridComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
