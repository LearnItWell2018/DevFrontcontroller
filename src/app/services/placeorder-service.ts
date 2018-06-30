import { Http,Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { CustomerOrder } from '../model/customer-order-model';
import { OrderDetails } from '../model/OrderDetails';
import { OrderList } from '../model/OrderList';
import { UserProfile } from '../model/user-profile-model';
import { CustomerAddress } from '../model/CustomerAddress';
import { environment } from '../../environments/environment';

@Injectable()
export class PlaceOredrService {

    body:CustomerOrder;
    orderDetails:OrderDetails;
    orderList:OrderList[];
    private serviceProp = environment.serviceURL;
    constructor(private http:Http) {}

    placeOrder() {
        this.body = JSON.parse(localStorage.getItem("customerOrder"));
        this.body.orderDetails.orderDate =   new Date().toDateString();
        console.log(this.body);
        this.http.post(this.serviceProp + '/rs/order', this.body).subscribe(
            res => {
                console.log(res);
                localStorage.removeItem("customerOrder");
                localStorage.removeItem("myKart");
            },
            err => {
                console.log("Error occured");
            }
        );
    }

    fillCustomerOrderFromCart (totalVal:String) {
        this.body = new CustomerOrder();
        this.orderDetails  = new OrderDetails();
        this.body.orderDetails = this.orderDetails;

        let myObject=JSON.parse('['+ localStorage.getItem('myKart') +']');

        let listOrder:OrderList[] = [];

        myObject.map(item => {
            return {
                productId: item.productId,
                itemCount: item.itemQuantity,
                itemPrice: item.itemPrice,
                itemImage: item.itemImage,
                itemDesc: item.itemDesc
            }
        }).forEach(item => listOrder.push(item));

        this.body.orderDetails.orderList = listOrder;
        this.body.orderDetails.orderTotal = totalVal;

        localStorage.setItem("customerOrder", JSON.stringify(this.body));
    }

    fillCustomerDetails (userProfile:UserProfile, mobile:String) {
        this.body = JSON.parse(localStorage.getItem("customerOrder"));
        this.body.customerMail = userProfile.nickname + "@gmail.com";
        this.body.customerMobile = mobile;
        this.body.orderStatus = "TRIGGER_MAIL";
        localStorage.setItem("customerOrder", JSON.stringify(this.body));
    }

    fillCustomerDetailsNew (name:String, mail:String, mobile:String) {
        this.body = JSON.parse(localStorage.getItem("customerOrder"));
        this.body.customerMail = mail;
        this.body.customerMobile = mobile;
        this.body.orderStatus = "TRIGGER_MAIL";
        localStorage.setItem("customerOrder", JSON.stringify(this.body));
    }
    
    fillCustomerAddress (address:CustomerAddress) {
        this.body = JSON.parse(localStorage.getItem("customerOrder"));
        this.body.customerAddress.push(address);
        localStorage.setItem("customerOrder", JSON.stringify(this.body));
    }
    
}