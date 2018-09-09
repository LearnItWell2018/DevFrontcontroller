import { Component, OnInit } from '@angular/core';
import { GridItem } from '../model/item-grid-models';
import { UtilityService } from '../services/utility-service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public selectedProduct:GridItem;
  public items: GridItem[] = [];

  constructor(private utility: UtilityService) {
    this.items.push(JSON.parse(localStorage.getItem("selectedProduct")));
    this.items.push(JSON.parse(localStorage.getItem("selectedProduct")));
    this.items.push(JSON.parse(localStorage.getItem("selectedProduct")));
  }

  ngOnInit() {
    this.selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
  }


  reduceQuantity() {
    if (this.selectedProduct.itemQuantity === 0) {
      return false;
    } else {
      this.selectedProduct.itemQuantity = this.selectedProduct.itemQuantity - 1;
    }
  }

  increaseQuantity() {
    if (this.selectedProduct.itemQuantity === 1000) {
      return false;
    } else {
      this.selectedProduct.itemQuantity = this.selectedProduct.itemQuantity + 1;
    }
  }

  quantityGtOne() {
    if (this.selectedProduct.itemQuantity === 0) {
      return true;
    } else {
      return false;
    }
  }

  addProductToWebStore() {
    if (this.selectedProduct.itemQuantity === 0) {
      alert('Error');
    } else {
      if (!localStorage.getItem('myKart')) {
        localStorage.setItem('myKart', JSON.stringify(this.selectedProduct));
        this.selectedProduct.itemQuantity = 0;
      } else {
        let myKart = localStorage.getItem('myKart');
        let presentItem = this.selectedProduct;
        if (myKart.indexOf(this.selectedProduct.productId) >= 0) {
          let myObject = JSON.parse('[' + myKart + ']');
          myObject.forEach(function (item) {
            if (item.productId === presentItem.productId) {
              item.itemQuantity = item.itemQuantity + presentItem.itemQuantity;
              let stripObj = JSON.stringify(myObject).split('[')[1].split(']')[0];
              localStorage.setItem('myKart', stripObj);
              presentItem.itemQuantity = 0;
              return;
            }
          });
        }
        else {
          myKart = myKart + "," + JSON.stringify(this.selectedProduct);
          localStorage.setItem('myKart', myKart);
          this.selectedProduct.itemQuantity = 0;
        }
      }
    }
    this.utility.notyifyAll();
  }
}
