import { ItemMenu } from '../model/item-menu-model';
import { Http,Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ItemMenuService{
    private crackersArray:ItemMenu[]=[];

    constructor(private http:Http){

        this.getIcons().subscribe(
            (response)=>{console.log(response);
             let JSONdata=response.json();
             JSONdata.items.forEach(element => {
                let icon=new ItemMenu(element.itemIMGPath,element.itemName,element.itemURL);
                this.crackersArray.push(icon);
             });
            },
            (error)=>{console.log(error)});
     
    }
    public getCrarckerIconsArray():ItemMenu[]{
        return this.crackersArray;
    }

    public setCrarckerIconsArray(crackersArray:ItemMenu[]){
       this.crackersArray=crackersArray;
    }

    public setCrarckerIconsArrayItem(cracker:ItemMenu){
       this.crackersArray.push(cracker);
    }

    public getIcons(){
        return this.http.get('https://kundalini.cfapps.io/rs/itemCategories/');
    }
}

