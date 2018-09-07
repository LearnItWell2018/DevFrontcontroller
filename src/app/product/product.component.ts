import { Component, OnInit } from '@angular/core';
import { GridItem } from '../model/item-grid-models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public selectedProduct:GridItem;

  constructor() { }

  ngOnInit() {
    this.selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
  }

}
