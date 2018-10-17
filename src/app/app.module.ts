import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CustomerComponent } from './customer/customer.component';
import { ItemMenuComponent } from './item-menu/item-menu.component';
import { ItemGridComponent } from './item-grid/item-grid.component';
import { ItemGridItemComponent } from './item-grid/item-grid-item/item-grid-item.component';
import { ItemsCartComponent } from './items-cart/items-cart.component';
import { ItemsCartListComponent } from './header/items-cart-list/items-cart-list.component';
import { AppRoutingModule } from "./app-routing.module"
import { FormsModule } from "@angular/forms"
import { ItemMenuService } from './services/item-menu-service';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { FooterComponent } from './footer/footer.component';
import { WhyusComponent } from './whyus/whyus.component';
import { ItemGridService } from './services/item-grid-service';
import { AuthService } from './services/auth-service';
import { PlaceOredrService } from './services/placeorder-service';
import { TypeaheadTemplateComponent } from './header/typeahead-template/typeahead-template.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { UtilityService } from './services/utility-service';
import { BrowseComponent } from './browse/browse.component';
import { OffersComponent } from './offers/offers.component';
//import { CountDown } from 'ng4-date-countdown-timer';
import { GoTopButtonModule } from 'ng2-go-top-button';
import { ProductComponent } from './product/product.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { CommentsService } from './services/comment-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdvertisementComponent } from './advertisement/advertisement.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ItemMenuComponent,
    ItemGridComponent,
    ItemGridItemComponent,
    ItemsCartComponent,
    ItemsCartListComponent,
    CustomerComponent,
    PlaceOrderComponent,
    FooterComponent,
    WhyusComponent,
    TypeaheadTemplateComponent,
    AboutusComponent,
    MyOrderComponent,
    BrowseComponent,
    OffersComponent,
    ProductComponent,
    AdvertisementComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, FormsModule, HttpModule, GoTopButtonModule, BrowserAnimationsModule, NgbModule.forRoot(), Ng2CarouselamosModule
  ],
  providers: [ItemMenuService,ItemGridService, AuthService, PlaceOredrService, UtilityService, CommentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
