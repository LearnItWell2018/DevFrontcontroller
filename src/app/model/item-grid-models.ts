export class GridItem{
                        productId : string;
						itemImage : string;
						brand : string;
						itemName: string;
						itemDesc: string;
						itemPrice: number;
						itemStock: string;
                        itemActive: boolean;
                        itemDetails:string;
						itemAdded:boolean;
						itemQuantity: number;
						totalFinalVal:number;
						offer: number;
						originalPrice: number;
						similarProduct: string[];

                        constructor(  productId : string,productImgPath : string,brand : string,itemName: string, itemDesc: string,
						itemPrice: number,itemStock: string,itemActive: boolean,itemDetails:string, offer: number, similarProduct: string[]){
                        this.productId =productId;
						this.itemImage =productImgPath;
						this.brand =brand;
						this.itemName=itemName;
						this.itemDesc=itemDesc;
						this.originalPrice=itemPrice;
						this.itemStock=itemStock;
						this.itemActive=itemActive;
						this.itemDetails=itemDetails;
						this.itemAdded=false;
						this.itemQuantity=0;
						this.totalFinalVal=0;
						this.offer = offer;
						this.itemPrice = itemPrice * (100 - this.offer)/100;
						this.similarProduct = similarProduct;
                        }
                    }                        