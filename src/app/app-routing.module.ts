import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ItemGridComponent } from './item-grid/item-grid.component';
import { CustomerComponent } from './customer/customer.component';

const appRoutes: Routes = [
  { path: '', component: ItemGridComponent },
  { path: 'signin', component: CustomerComponent},
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
