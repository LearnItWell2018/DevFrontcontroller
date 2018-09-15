import { Comment } from '../model/comment';

export class Comments {
    public customerMail:string;
    public customerMobile:string;
    public customerName:string;
    public comment:Comment;

    constructor(customerMail:string, customerMobile:string, customerName:string, comment:Comment) {
        this.customerMail = customerMail;
        this.customerMobile = customerMobile;
        this.customerName = customerName;
        this.comment = comment;
    }

}