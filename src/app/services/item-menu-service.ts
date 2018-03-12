import { ItemMenu } from '../model/item-menu-model';


export class ItemMenuService{
    private crackersArray:ItemMenu[]=[];
    constructor(){
        let icon1=new ItemMenu('/assets/menu-icons/001-rocket-1.svg','Rocket','rockets');
        let icon2=new ItemMenu('/assets/menu-icons/002-rocket.svg','Bomb','bombs');
        let icon3=new ItemMenu('/assets/menu-icons/003-magic.svg','FireStick','firesticks');
        let icon4=new ItemMenu('/assets/menu-icons/004-rocket-2.svg','Pot','pots');
            this.crackersArray.push(icon1);
            this.crackersArray.push(icon2);
            this.crackersArray.push(icon3);
            this.crackersArray.push(icon4);   
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
}

