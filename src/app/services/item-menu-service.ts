import { ItemMenu } from '../model/item-menu-model';
import { Http,Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ItemMenuService{
    private crackersArray:ItemMenu[]=[];

    private serviceProp = environment.serviceURL;

    constructor(private http:Http){

        this.getIcons().subscribe(
            (response)=>{//console.log(response);
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
        return this.http.get(this.serviceProp + '/rs/itemCategories/');
    }
}

