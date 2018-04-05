import { OrderDetails } from "./OrderDetails";
import { CustomerAddress } from "./CustomerAddress";

export class CustomerOrder{

    public customerMail:String;

    public customerMobile:String;
  
    public orderDetails:OrderDetails;
  
    public customerAddress:CustomerAddress[] = [];
   

}