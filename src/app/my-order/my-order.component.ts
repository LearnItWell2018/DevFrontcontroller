import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from '../services/auth-service';
import { CustomerOrder } from '../model/customer-order-model';
import { environment } from '../../environments/environment';

let orderList;

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  private orderListAll:CustomerOrder[];
  private serviceProp = environment.serviceURL;

  constructor(public http:Http, public authService:AuthService) { }

  ngOnInit() {
    this.http.get(this.serviceProp + '/rs/order/' + this.getUserEmail()).subscribe(
      (response) => {
        this.orderListAll = response.json();
        console.log('orderList : ' + JSON.stringify(this.orderListAll));
      },
      (error) => { console.log(error) })
  }

  getUserEmail () : String {
    return this.authService.getProfile().nickname + "@gmail.com";
  }

}
