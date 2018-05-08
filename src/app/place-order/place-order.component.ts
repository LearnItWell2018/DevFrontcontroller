import { Component, OnInit } from '@angular/core';
import { PlaceOredrService } from '../services/placeorder-service';
import { AuthService } from '../services/auth-service';
import { CustomerAddress } from '../model/CustomerAddress';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {


  customerAddress: CustomerAddress;

  constructor(private placeOredrService: PlaceOredrService, private auth: AuthService) {
    localStorage.setItem("customerOrder", "");
  }

  ngOnInit() {
    this.placeOredrService.fillCustomerOrderFromCart();
  }

  onSubmit(customerFrom) {
    console.log(customerFrom);
    if (this.auth.isAuthenticated) {
      this.placeOredrService.fillCustomerDetails(this.auth.getProfile(), customerFrom.mobile);
    } else {
      this.placeOredrService.fillCustomerDetailsNew(customerFrom.fullName, customerFrom.email, customerFrom.mobile);
    }

    this.customerAddress = new CustomerAddress("1", customerFrom.address.postalcode,
      customerFrom.address.street, customerFrom.address.flatno, customerFrom.address.nearestLandMark);
    this.placeOredrService.fillCustomerAddress(this.customerAddress);

    this.placeOredrService.placeOrder();

  }

}
