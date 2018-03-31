import { Component, OnInit } from '@angular/core';
import { PlaceOredrService } from '../services/placeorder-service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
  styles: ['input.ng-invalid{border-left:5px solid red;} input.ng-valid{border-left:5px solid green;}']
})
export class PlaceOrderComponent implements OnInit {

  placeOredrService:PlaceOredrService;

  constructor(placeOredrService:PlaceOredrService) {
    localStorage.setItem("customerOrder", "");
   }

  ngOnInit() {
    this.placeOredrService = new PlaceOredrService();
    this.placeOredrService.fillCustomerOrderFromCart();
  }

  onSubmit(value: any) {
    console.log(value);
    
  }

}
