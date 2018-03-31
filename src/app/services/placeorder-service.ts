import { Http,Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { CustomerOrder } from '../model/customer-order-model';
import { OrderDetails } from '../model/OrderDetails';
import { OrderList } from '../model/OrderList';

@Injectable()
export class PlaceOredrService {

    http:Http;
    body:CustomerOrder;
    orderDetails:OrderDetails;
    orderList:OrderList[];


    placeOrder() {
        this.http.post('https://kundalini.cfapps.io/rs/order/', this.body);
    }

    fillCustomerOrderFromCart () {
        this.body = new CustomerOrder();
        this.orderDetails  = new OrderDetails();
        this.body.orderDetails = this.orderDetails;
        this.body.orderDetails.orderList = JSON.parse('['+ localStorage.getItem('myKart') +']');
        localStorage.setItem("customerOrder", JSON.stringify(this.body));
    }

    fillCustomerDetails () {
        
    }


}