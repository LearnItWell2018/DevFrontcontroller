import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { GridItem } from '../model/item-grid-models';

@Injectable()
export class UtilityService {
    public myKartList: GridItem[];
    itemAdded = new Subject<string>();
    constructor() { }

    notyifyAll() {
        this.itemAdded.next('added');
    }

    totalItemCount(): number {
        let numberOfitems: number = 0;
        let myKart = localStorage.getItem('myKart');
        if (myKart != null) {
            this.myKartList = JSON.parse('[' + myKart + ']');
            this.myKartList.forEach(function (item) {
                numberOfitems = numberOfitems + item.itemQuantity;
            });
        }
        return numberOfitems;
    }

    getSelectedProduct(): GridItem {
        return JSON.parse(localStorage.getItem("selectedProduct"));
    }

}