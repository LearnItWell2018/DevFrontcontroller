import { Component, OnInit } from '@angular/core';
import { GridItem } from '../model/item-grid-models';
import { ItemGridService } from '../services/item-grid-service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { element } from 'protractor';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  public gridItemArray: GridItem[] = [];
  public resultGridItemArray: GridItem[] = [];
  public brands:String[] = [];
  public types:String[] = [];
  public maxPrice:Number = 0;
  public minPrice:Number = 1000;

  constructor(private itemGridService: ItemGridService) { }

  ngOnInit() {
    this.itemGridService.getAllData().subscribe(
      (response) => {
        this.itemGridService.gridItemArray = [];
        let JSONdata = response.json();
        JSONdata.forEach(element => {

          let filteredItem = new GridItem(element.productId, element.productImgPath, element.brand, element.itemName, element.itemDesc,
            element.itemPrice, element.itemStock, element.itemActive, element.itemDetails, element.offer);
          
          if (this.brands.lastIndexOf(element.brand) < 0) {
            this.brands.push(element.brand);
          }
          if (element.itemPrice > this.maxPrice) {
            this.maxPrice = element.itemPrice;
          }
          if (element.itemPrice < this.minPrice) {
            this.minPrice = element.itemPrice;
          }

          this.itemGridService.gridItemArray.push(filteredItem);
        });
        this.gridItemArray = this.itemGridService.getCrarckerIconsArray();
        console.log(this.gridItemArray);
      },
      (error) => { console.log(error) });

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  reduceQuantity(index) {
    if (this.gridItemArray[index].itemQuantity === 0) {
      return false;
    } else {
      this.gridItemArray[index].itemQuantity = this.gridItemArray[index].itemQuantity - 1;
    }
  }

  increaseQuantity(index) {
    if (this.gridItemArray[index].itemQuantity === 1000) {
      return false;
    } else {
      this.gridItemArray[index].itemQuantity = this.gridItemArray[index].itemQuantity + 1;
    }

    console.log(this.brands);
    console.log(this.maxPrice);
    console.log(this.minPrice);

  }

  addProductToWebStore(index: number, inputElem: HTMLFormElement) {
    if (this.gridItemArray[index].itemQuantity === 0) {
      alert('Error');
    } else {
      if (!localStorage.getItem('myKart')) {
        localStorage.setItem('myKart', JSON.stringify(this.gridItemArray[index]));
        this.gridItemArray[index].itemQuantity = 0;
      } else {
        let myKart = localStorage.getItem('myKart');
        let presentItem = this.gridItemArray[index];
        if (myKart.indexOf(this.gridItemArray[index].productId) >= 0) {
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
          myKart = myKart + "," + JSON.stringify(this.gridItemArray[index]);
          localStorage.setItem('myKart', myKart);
          this.gridItemArray[index].itemQuantity = 0;
        }
      }
    }
  }

  quantityGtOne(index: number) {
    if (this.gridItemArray[index].itemQuantity === 0) {
      return true;
    } else {
      return false;
    }
  }

  navigateAfterClicked() {
    document.getElementById('kartForView').scrollIntoView({
      behavior: 'smooth',
      block: "end"
    });
  }

  applyFilter(brand:String[], type:String[], maxPrice:Number, minPrice:Number) {

    this.gridItemArray.forEach(element => {
      if(brand.indexOf(element.brand) > -1 && type.indexOf(element.productId.split("_")[0]) > -1){
        this.resultGridItemArray.push(element);
      }
    });
  }




}
