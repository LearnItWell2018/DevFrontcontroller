import { Component, OnInit } from '@angular/core';
import { GridItem } from '../model/item-grid-models';

@Component({
  selector: 'app-items-cart',
  templateUrl: './items-cart.component.html',
  styleUrls: ['./items-cart.component.css']
})
export class ItemsCartComponent implements OnInit {
  private myKartList:GridItem[];
  private totalValue:number=0;
  constructor() { }

  ngOnInit() {
    let myKart=localStorage.getItem('myKart');
    this.myKartList=JSON.parse('['+myKart+']');
    this.myKartList.forEach(function(item){
      item["totalFinalVal"]=item.itemQuantity*item.itemPrice;
    });
    this.syncWithKart();
    this.calculateTotal();
    //let myKartModify=localStorage.setItem('myKartModify');
  }

  reduceQuantity(index){
    if(this.myKartList[index].itemQuantity===0){
      return false;
    }else{
     this.myKartList[index].itemQuantity=this.myKartList[index].itemQuantity-1;
     this.myKartList[index]["totalFinalVal"]=this.myKartList[index].itemQuantity*this.myKartList[index].itemPrice;
     this.syncWithKart();
     this.calculateTotal();
    }
    
 }
 
 increaseQuantity(index){
   if(this.myKartList[index].itemQuantity===1000){
     return false;
   }else{
    this.myKartList[index].itemQuantity=this.myKartList[index].itemQuantity+1;
    this.myKartList[index]["totalFinalVal"]=this.myKartList[index].itemQuantity*this.myKartList[index].itemPrice;
    this.syncWithKart();
    this.calculateTotal();
  }

 }

 removeThisProduct(i){
   this.myKartList.splice(i,1);
   this.syncWithKart();
   this.calculateTotal();
 }

 syncWithKart(){
  let stripObj=JSON.stringify(this.myKartList).split('[')[1].split(']')[0];
  localStorage.setItem('myKart',stripObj); 
 }

calculateTotal(){
  this.myKartList.forEach(function(item){
    this.totalValue=this.totalValue+item.totalFinalVal;
  })
 }
}
