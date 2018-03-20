import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { ItemGridService } from '../services/item-grid-service';
import { GridItem } from '../model/item-grid-models';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.css']
})
export class ItemGridComponent implements OnInit ,OnDestroy{
  itemtype:string; 
  subscription:Subscription;
  public gridItemArray:GridItem[]=[];
  constructor(private router:ActivatedRoute,private itemGridService:ItemGridService) { }

  ngOnInit() {
    this.itemtype=this.router.snapshot.params['crackers'];
    this.router.params.subscribe((params:Params)=>{
      this.itemtype=params['crackers'];
      this.itemGridService.setUrl(this.itemtype);
      //console.log('After Setting the URL');
      this.subscription=this.itemGridService.getData().subscribe(
        (response)=>{
          //console.log(response);
         this.itemGridService.gridItemArray=[]; 
         let JSONdata=response.json();
         //console.log(JSONdata);
        JSONdata.forEach(element => {
  
            let crakerItm=new GridItem( element.productId,element.productImgPath,element.brand,element.itemName,
                element.itemPrice,element.itemStock,element.itemActive,element.itemDetails);
            this.itemGridService.gridItemArray.push(crakerItm);
         });
         this.gridItemArray=this.itemGridService.getCrarckerIconsArray();
         console.log(this.gridItemArray);
        },
        (error)=>{console.log(error)});
    });
  }
ngOnDestroy(){
   this.subscription.unsubscribe();
}
}
