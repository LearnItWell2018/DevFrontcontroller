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
             JSONdata.items.array.forEach(element => {
                let icon=new ItemMenu(element.itemIMGPath,element.itemName,element.itemURL);
                this.crackersArray.push(icon);
             });
            },
            (error)=>{console.log(error)});

/*         let icon1=new ItemMenu('/assets/menu-icons/001-rocket-1.svg','Rocket','rockets');
        let icon2=new ItemMenu('/assets/menu-icons/002-rocket.svg','Bomb','bombs');
        let icon3=new ItemMenu('/assets/menu-icons/003-magic.svg','FireStick','firesticks');
        let icon4=new ItemMenu('/assets/menu-icons/004-rocket-2.svg','Pot','pots');
            this.crackersArray.push(icon1);
            this.crackersArray.push(icon2);
            this.crackersArray.push(icon3);
            this.crackersArray.push(icon4);  */
            
          
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
        return this.http.get('https://localhost:8080/kundalini/rs/itemCategories/');
    }
}

