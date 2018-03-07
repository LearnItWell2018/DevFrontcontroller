import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ItemMenuComponent } from './item-menu/item-menu.component';
import { ItemGridComponent } from './item-grid/item-grid.component';
import { ItemGridItemComponent } from './item-grid/item-grid-item/item-grid-item.component';
import { ItemsCartComponent } from './items-cart/items-cart.component';
import { ItemsCartListComponent } from './header/items-cart-list/items-cart-list.component';
import { AppRoutingModule } from "./app-routing.module"


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ItemMenuComponent,
    ItemGridComponent,
    ItemGridItemComponent,
    ItemsCartComponent,
    ItemsCartListComponent
  ],
  imports: [
    BrowserModule,AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
