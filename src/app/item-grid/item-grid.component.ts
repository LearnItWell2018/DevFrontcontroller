import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { ItemGridService } from '../services/item-grid-service';
import { GridItem } from '../model/item-grid-models';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import * as $ from 'jquery';
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
      if (this.itemtype != null) {
        this.itemGridService.setUrl(this.itemtype);
      } else {
        this.itemGridService.setUrl("SHELL");
      }
      //console.log('After Setting the URL');
      this.subscription=this.itemGridService.getData().subscribe(
        (response)=>{
          //console.log(response);
         this.itemGridService.gridItemArray=[]; 
         let JSONdata=response.json();
         //console.log(JSONdata);
        JSONdata.forEach(element => {
  
            let crakerItm=new GridItem( element.productId,element.productImgPath,element.brand,element.itemName, element.itemDesc,
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

reduceQuantity(index){
   if(this.gridItemArray[index].itemQuantity===0){
     return false;
   }else{
    this.gridItemArray[index].itemQuantity=this.gridItemArray[index].itemQuantity-1;
   }
}

increaseQuantity(index){
  if(this.gridItemArray[index].itemQuantity===1000){
    return false;
  }else{
   this.gridItemArray[index].itemQuantity=this.gridItemArray[index].itemQuantity+1;
  }
}

addProductToWebStore(index:number,inputElem:HTMLFormElement){
  if(this.gridItemArray[index].itemQuantity===0){
    alert('Error');
  }else{
    if(!localStorage.getItem('myKart')){
      localStorage.setItem('myKart',JSON.stringify(this.gridItemArray[index]));
      this.gridItemArray[index].itemQuantity=0;
    }else{
      let myKart=localStorage.getItem('myKart');
      let presentItem=this.gridItemArray[index];
      if(myKart.indexOf(this.gridItemArray[index].productId)>=0){
        let myObject=JSON.parse('['+myKart+']');
        myObject.forEach(function(item){
          if(item.productId===presentItem.productId){
            item.itemQuantity=item.itemQuantity+presentItem.itemQuantity;
            let stripObj=JSON.stringify(myObject).split('[')[1].split(']')[0];
            localStorage.setItem('myKart',stripObj);
            presentItem.itemQuantity=0;
            return;
          }
        });
      }
      else{
      myKart=myKart+","+JSON.stringify(this.gridItemArray[index]);
      localStorage.setItem('myKart',myKart);
      this.gridItemArray[index].itemQuantity=0;
      }
    }
  }
}

quantityGtOne(index:number){
  if(this.gridItemArray[index].itemQuantity===0){
  return true;
  }else{
    return false;
  }
}

navigateAfterClicked(){
  //alert(document.getElementById('kartForView'));
  document.getElementById('kartForView').scrollIntoView({
    behavior: 'smooth',
    block: "end"
});
  //$('#kartForView').animate({ scrollTop: $(this.hash).offset().top}, 1000)
}
}
