import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GridItem } from '../../model/item-grid-models';
import { Subject } from 'rxjs/Subject';
import { UtilityService } from '../../services/utility-service';									   
import { environment } from '../../../environments/environment';

let itemsInList;
let itemSelected;

@Component({
  selector: 'ngbd-typeahead-template',
  templateUrl: './typeahead-template.component.html',
  styleUrls: ['./typeahead-template.component.css']
})
export class TypeaheadTemplateComponent implements OnInit {
  public model: any;
  public gridItem: GridItem;
  private serviceProp = environment.serviceURL;

  constructor(private http: Http,private utility:UtilityService) { }
  ngOnInit() {
    this.http.get(this.serviceProp + '/rs/items/list').subscribe(
      (response) => {
        itemsInList = response.json();
        //console.log('itemsWithImage:' + itemsInList);
      },
      (error) => { console.log(error) })
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : itemsInList.filter(v => v.itemName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  formatter = (x: { itemName: string }) => x.itemName;

  addItemOnClicked(object) {
    console.log(object.target.id);
    this.findItemDetails(object.target.id);
  }

  findItemDetails(itemID: String) {
    this.http.get(this.serviceProp + '/rs/items/' + itemID.split("-")[0] + '/' + itemID).subscribe(
      (response) => {
        itemSelected = response.json();
        this.gridItem  = new GridItem(itemSelected.productId,itemSelected.productImgPath,itemSelected.brand,itemSelected.itemName, itemSelected.itemDesc,
          itemSelected.itemPrice,itemSelected.itemStock,itemSelected.itemActive,itemSelected.itemDetails, itemSelected.offer);
          this.gridItem.itemQuantity = 1;
          this.addProductToWebStore(this.gridItem);
      },
      (error) => { console.log(error) })
  }

  addProductToWebStore(presentItem: GridItem) {
    console.log(presentItem);
    if (!localStorage.getItem('myKart')) {
      localStorage.setItem('myKart', JSON.stringify(presentItem));
    } else {
      let myKart = localStorage.getItem('myKart');
      if (myKart.indexOf(presentItem.productId) >= 0) {
        let myObject = JSON.parse('[' + myKart + ']');
        myObject.forEach(function (item) {
          if (item.productId === presentItem.productId) {
            item.itemQuantity = item.itemQuantity + presentItem.itemQuantity;
            let stripObj = JSON.stringify(myObject).split('[')[1].split(']')[0];
            localStorage.setItem('myKart', stripObj);
       
          }
        });
      }
      else {
        myKart = myKart + "," + JSON.stringify(presentItem);
        localStorage.setItem('myKart', myKart);
      }
    }
	 this.utility.notyifyAll();						  
  }
}

