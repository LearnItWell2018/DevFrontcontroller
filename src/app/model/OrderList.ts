export class OrderList {


    public  productId:String;

    public itemCount:String ;

    public itemPrice:String ;

    public itemImage:String ;
 
    public itemDesc:String ;

    constructor (productId:String, itemCount:String, itemPrice:String, itemImage:String, itemDesc:String) {
        this.productId = productId;
        this.itemCount = itemCount;
        this.itemDesc = itemDesc;
        this.itemImage = itemImage;
        this.itemPrice = itemPrice;
    }


}