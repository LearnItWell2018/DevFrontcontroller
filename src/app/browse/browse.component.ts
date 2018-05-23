import { Component, OnInit } from '@angular/core';
import { GridItem } from '../model/item-grid-models';
import { ItemGridService } from '../services/item-grid-service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { element } from 'protractor';
import { ItemMenu } from '../model/item-menu-model';
import { ItemMenuService } from '../services/item-menu-service';

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

  constructor(private itemGridService: ItemGridService, private itemMenuService: ItemMenuService) { }

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
            this.filteredBrand.push(element.brand);
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
        this.resultGridItemArray = this.gridItemArray;
      },
      (error) => { console.log(error) });

    this.itemMenus = this.itemMenuService.getCrarckerIconsArray();

    this.itemMenuService.getIcons().subscribe(
      (response) => {
        let JSONdata = response.json();
        JSONdata.items.forEach(element => {
          this.filtereditemMenus.push(element.itemName);
        });
      },
      (error) => { console.log(error) });

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

  applyFilter(brand: String[], itemType: String[]) {
    this.resultGridItemArray = [];
    this.gridItemArray.forEach(element => {
      if (brand.indexOf(element.brand) > -1 && itemType.indexOf(element.productId.split('-')[0]) > -1) {
        this.resultGridItemArray.push(element);
      }
    });
  }

  detectFilterCriteria(object, filterType: String) {
    if (filterType === 'B') {
      if (object.target.checked) {
        this.filteredBrand.push(object.target.id);
      } else {
        const index: number = this.filteredBrand.indexOf(object.target.id);
        if (index !== -1) {
          this.filteredBrand.splice(index, 1);
        }
      }
    }
    if (filterType === 'T') {
      if (object.target.checked) {
        this.filtereditemMenus.push(object.target.id);
      } else {
        const index: number = this.filtereditemMenus.indexOf(object.target.id);
        if (index !== -1) {
          this.filtereditemMenus.splice(index, 1);
        }
      }
    }
    this.applyFilter(this.filteredBrand, this.filtereditemMenus);
  }

}
