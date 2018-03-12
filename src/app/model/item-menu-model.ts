export class ItemMenu{
    public crackerIconURL:string;   
    public crackerTitleText:string;
    public crackerIconImagePath:string;
   
    constructor(iconImagePath:string,iconTitleText:string,iconURL:string){
        this.crackerIconURL=iconURL;
        this.crackerTitleText=iconTitleText;
        this.crackerIconImagePath=iconImagePath;
    }

}