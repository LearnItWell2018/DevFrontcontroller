import { GridItem } from '../model/item-grid-models';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ItemGridService {
    public gridItemArray: GridItem[] = [];
    private base = environment.serviceURL + '/rs/items/';
    private baseAll = environment.serviceURL + '/rs/items/list';
    private URL: string;
    constructor(private http: Http) {
    }
    public getCrarckerIconsArray(): GridItem[] {
        return this.gridItemArray;
    }

    public setCrarckerIconsArray(gridItemArray: GridItem[]) {
        this.gridItemArray = gridItemArray;
    }

    public setCrarckerIconsArrayItem(crackerItem: GridItem) {
        this.gridItemArray.push(crackerItem);
    }

    public setUrl(parama: string) {
        this.URL = this.base + parama;
    }
    public getData() {
        return this.http.get(this.URL);
    }

    public getAllData() {
        return this.http.get(this.baseAll);
    }
}

