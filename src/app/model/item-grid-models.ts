export class GridItem{
                        productId : string;
						productImgPath : string;
						brand : string;
						itemName: string;
						itemPrice: number;
						itemStock: string;
                        itemActive: boolean;
                        itemDetails:string;
						itemAdded:boolean;
						itemQuantity: number;
						totalFinalVal:number;

                        constructor(  productId : string,productImgPath : string,brand : string,itemName: string,
						itemPrice: number,itemStock: string,itemActive: boolean,itemDetails:string){
                        this.productId =productId;
						this.productImgPath =productImgPath;
						this.brand =brand;
						this.itemName=itemName;
						this.itemPrice=itemPrice;
						this.itemStock=itemStock;
						this.itemActive=itemActive;
						this.itemDetails=itemDetails;
						this.itemAdded=false;
						this.itemQuantity=0;
						this.totalFinalVal=0;
                        }
                    }                        