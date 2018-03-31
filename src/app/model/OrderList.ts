export class OrderList {


    private  productId:String;

    private itemCount:String ;

    private itemPrice:String ;

    private itemImage:String ;
 
    private itemDesc:String ;

    constructor (productId:String, itemCount:String, itemPrice:String, itemImage:String, itemDesc:String) {
        this.productId = productId;
        this.itemCount = itemCount;
        this.itemDesc = itemDesc;
        this.itemImage = itemImage;
        this.itemPrice = itemPrice;
    }


}