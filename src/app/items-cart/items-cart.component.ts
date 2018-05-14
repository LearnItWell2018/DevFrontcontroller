import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridItem } from '../model/item-grid-models';
import { ActivatedRoute,Router} from '@angular/router';
import { UtilityService } from '../services/utility-service';
import { Subscription } from 'rxjs/Subscription';															 

@Component({
  selector: 'app-items-cart',
  templateUrl: './items-cart.component.html',
  styleUrls: ['./items-cart.component.css']
})
export class ItemsCartComponent implements OnInit,OnDestroy {
  private myKartList:GridItem[];
  private totalValue:number=0;
  private subscription:Subscription;
  constructor(private route:Router, private activated:ActivatedRoute,private utility:UtilityService) { }

  ngOnInit() {
    let myKart=localStorage.getItem('myKart');
    if (myKart!= null) {					   									   
      this.myKartList=JSON.parse('['+myKart+']');							   
      this.myKartList.forEach(function(item){
        item["totalFinalVal"]=item.itemQuantity*item.itemPrice;
      });
      this.syncWithKart();
      this.calculateTotal();
    }
	this.subscription=this.utility.itemAdded.subscribe((data:string)=>{
      console.log(data+'...........'); 
	  myKart=localStorage.getItem('myKart');
      this.myKartList=JSON.parse('['+myKart+']');
      console.log(this.myKartList);
      this.myKartList.forEach(function(item){
        item["totalFinalVal"]=item.itemQuantity*item.itemPrice;
      });
      this.syncWithKart();
      this.calculateTotal();
    })
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
  let totalVal=0;
  this.myKartList.forEach(function(item){
   
    totalVal=totalVal + item.totalFinalVal;
  });
  console.log(totalVal);
  this.totalValue=totalVal;
 }

 gotoPlaceOrder() {
  this.route.navigate(['../placeorder']);
 }

 ngOnDestroy(){
  this.subscription.unsubscribe();
 }			   
}
