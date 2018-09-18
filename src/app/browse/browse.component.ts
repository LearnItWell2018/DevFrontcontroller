import { Component, OnInit } from '@angular/core';
import { GridItem } from '../model/item-grid-models';
import { ItemGridService } from '../services/item-grid-service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { element } from 'protractor';
import { ItemMenu } from '../model/item-menu-model';
import { ItemMenuService } from '../services/item-menu-service';
import { UtilityService } from '../services/utility-service';
import {GoTopButtonModule} from 'ng2-go-top-button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; 

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  subscription: Subscription;

  public gridItemArray: GridItem[] = [];
  public resultGridItemArray: GridItem[] = [];
  public brands: String[] = [];
  public filteredBrand: String[] = [];
  public types: String[] = [];
  public maxPrice: Number = 0;
  public minPrice: Number = 1000;
  public itemMenus: ItemMenu[];
  public filtereditemMenus: String[] = [];

  public filteredBrandValue: Boolean[] = [];
  public filtereditemMenusValue: Boolean[] = [];

  public mobileFilterFlag = true;

  public currentElementVal:Number = 0;

  constructor(private itemGridService: ItemGridService, private itemMenuService: ItemMenuService, private utility:UtilityService) { }

  ngOnInit() {
    this.itemGridService.getAllData().subscribe(
      (response) => {
        this.itemGridService.gridItemArray = [];
        let JSONdata = response.json();
        JSONdata.forEach(element => {

          let filteredItem = new GridItem(element.productId, element.productImgPath, element.brand, element.itemName, element.itemDesc,
            element.itemPrice, element.itemStock, element.itemActive, element.itemDetails, element.offer, element.similarProduct);

          if (this.brands.lastIndexOf(element.brand) < 0) {
            this.brands.push(element.brand);
            this.filteredBrand.push(element.brand);
            this.filteredBrandValue.push(true);
          }
          this.currentElementVal =  new Number(element.itemPrice);
          if (this.currentElementVal > this.maxPrice) {
            this.maxPrice = this.currentElementVal;
          }
          if (this.currentElementVal < this.minPrice) {
            this.minPrice = element.itemPrice;
          }

          this.itemGridService.gridItemArray.push(filteredItem);
        });
        this.gridItemArray = this.itemGridService.getCrarckerIconsArray();
        this.resultGridItemArray = this.gridItemArray;
      },
      (error) => { console.log(error) });

    this.itemMenus = this.itemMenuService.getCrarckerIconsArray();

    this.itemMenuService.getIcons().subscribe(
      (response) => {
        let JSONdata = response.json();
        JSONdata.items.forEach(element => {
          this.filtereditemMenus.push(element.itemName);
          this.filtereditemMenusValue.push(true);
        });
      },
      (error) => { console.log(error) });

  }

  reduceQuantity(index) {
    if (this.resultGridItemArray[index].itemQuantity === 0) {
      return false;
    } else {
      this.resultGridItemArray[index].itemQuantity = this.resultGridItemArray[index].itemQuantity - 1;
    }
  }

  increaseQuantity(index) {
    if (this.resultGridItemArray[index].itemQuantity === 1000) {
      return false;
    } else {
      this.resultGridItemArray[index].itemQuantity = this.resultGridItemArray[index].itemQuantity + 1;
    }
  }

  addProductToWebStore(index: number, inputElem: HTMLFormElement) {
    if (this.resultGridItemArray[index].itemQuantity === 0) {
      alert('Error');
    } else {
      if (!localStorage.getItem('myKart')) {
        localStorage.setItem('myKart', JSON.stringify(this.resultGridItemArray[index]));
        this.resultGridItemArray[index].itemQuantity = 0;
      } else {
        let myKart = localStorage.getItem('myKart');
        let presentItem = this.resultGridItemArray[index];
        if (myKart.indexOf(this.resultGridItemArray[index].productId) >= 0) {
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
          myKart = myKart + "," + JSON.stringify(this.resultGridItemArray[index]);
          localStorage.setItem('myKart', myKart);
          this.resultGridItemArray[index].itemQuantity = 0;
        }
      }
    }
    this.utility.notyifyAll();
  }

  quantityGtOne(index: number) {
    if (this.resultGridItemArray[index].itemQuantity === 0) {
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

  applyFilter(brand: String[], itemType: String[], range:Number) {
    this.resultGridItemArray = [];
    this.gridItemArray.forEach(element => {
      if (brand.indexOf(element.brand) > -1 && itemType.indexOf(element.productId.split('-')[0]) > -1 && element.itemPrice <= range) {
        this.resultGridItemArray.push(element);
      }
    });
  }

  detectFilterCriteria(object, filterType: String, i:number) {
    if (filterType === 'B') {
      if (object.target.checked) {
        this.filteredBrand.push(object.target.id);
        this.filteredBrandValue[i] = true;
      } else {
        const index: number = this.filteredBrand.indexOf(object.target.id);
        if (index !== -1) {
          this.filteredBrand.splice(index, 1);
          this.filteredBrandValue[i] = false;
        }
      }
    }
    if (filterType === 'T') {
      if (object.target.checked) {
        this.filtereditemMenus.push(object.target.id);
        this.filtereditemMenusValue[i] = true;
      } else {
        const index: number = this.filtereditemMenus.indexOf(object.target.id);
        if (index !== -1) {
          this.filtereditemMenus.splice(index, 1);
          this.filtereditemMenusValue[i] = false;
        }
      }
    }
    this.applyFilter(this.filteredBrand, this.filtereditemMenus, this.currentElementVal);
  }

  displayFilter(flag:String) {
    if (flag === 'close') {
      this.mobileFilterFlag = false;
    } else if (flag === 'open') {
      this.mobileFilterFlag = true;
    }
    console.log(flag);
  }

  changedVal(object) {
    this.currentElementVal = object * this.maxPrice.valueOf() / 100;
    console.log(this.currentElementVal);
    this.applyFilter(this.filteredBrand, this.filtereditemMenus, this.currentElementVal);
  }
}
