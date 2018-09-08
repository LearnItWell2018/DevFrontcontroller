import { Component, OnInit } from '@angular/core';
import { GridItem } from '../model/item-grid-models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public selectedProduct:GridItem;
  public items: GridItem[] = [];

  constructor() {
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
}
