import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridItem } from '../model/item-grid-models';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../services/utility-service';
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Offer } from '../model/Offer';

@Component({
  selector: 'app-items-cart',
  templateUrl: './items-cart.component.html',
  styleUrls: ['./items-cart.component.css']
})
export class ItemsCartComponent implements OnInit, OnDestroy {
  public myKartList: GridItem[];
  public totalValue: number = 0;
  private subscription: Subscription;
  private serviceProp = environment.serviceURL;
  public offers: Offer[] = [];
  public selectedOption: String;
  public offerDetails: String;

  constructor(private route: Router, private activated: ActivatedRoute, private utility: UtilityService, private http: Http) { }

  ngOnInit() {
    let myKart = localStorage.getItem('myKart');
    if (myKart != null) {
      this.myKartList = JSON.parse('[' + myKart + ']');
      this.myKartList.forEach(function (item) {
        item["totalFinalVal"] = item.itemQuantity * item.itemPrice;
      });
      this.syncWithKart();
      this.calculateTotal();
    }
    this.subscription = this.utility.itemAdded.subscribe((data: string) => {
      console.log(data + '...........');
      myKart = localStorage.getItem('myKart');
      this.myKartList = JSON.parse('[' + myKart + ']');
      console.log(this.myKartList);
      this.myKartList.forEach(function (item) {
        item["totalFinalVal"] = item.itemQuantity * item.itemPrice;
      });
      this.syncWithKart();
      this.calculateTotal();
    })

    this.http.get(this.serviceProp + '/rs/offer').subscribe(
      (response) => {
        console.log(response.json());
        let JSONdata = response.json();
        JSONdata.forEach(element => {
          let temp = new Offer();

          temp.offerID = element.offerID;
          temp.offerCreator = element.offerCreator;
          temp.offerStartTime = element.offerStartTime;
          temp.offerEndTime = element.offerEndTime;
          temp.description = element.offerDetails.description;
          temp.percentageApplicable = element.offerDetails.percentageApplicable;
          temp.initialPreBookPercentage = element.offerDetails.initialPreBookPercentage;
          temp.preBookPercentageApplicable = element.offerDetails.preBookPercentageApplicable;
          temp.strategy = element.offerDetails.strategy;
          temp.offerIMG = "assets/image/" + element.offerID + ".jpg";
          temp.deliveryDates = element.offerDetails.deliveryDates;
          this.offers.push(temp);
        });
      },
      (error) => { console.log(error) })
  }

  reduceQuantity(index) {
    if (this.myKartList[index].itemQuantity === 0) {
      return false;
    } else {
      this.myKartList[index].itemQuantity = this.myKartList[index].itemQuantity - 1;
      this.myKartList[index]["totalFinalVal"] = this.myKartList[index].itemQuantity * this.myKartList[index].itemPrice;
      this.syncWithKart();
      this.calculateTotal();
    }

  }

  increaseQuantity(index) {
    if (this.myKartList[index].itemQuantity === 1000) {
      return false;
    } else {
      this.myKartList[index].itemQuantity = this.myKartList[index].itemQuantity + 1;
      this.myKartList[index]["totalFinalVal"] = this.myKartList[index].itemQuantity * this.myKartList[index].itemPrice;
      this.syncWithKart();
      this.calculateTotal();
    }

  }

  removeThisProduct(i) {
    this.myKartList.splice(i, 1);
    this.syncWithKart();
    this.calculateTotal();
  }

  syncWithKart() {
    let stripObj = JSON.stringify(this.myKartList).split('[')[1].split(']')[0];
    localStorage.setItem('myKart', stripObj);
  }

  calculateTotal() {
    let totalVal = 0;
    this.myKartList.forEach(function (item) {

      totalVal = totalVal + item.totalFinalVal;
    });
    console.log(totalVal);
    this.totalValue = totalVal;
  }

  gotoPlaceOrder() {
    if (this.totalValue > 0) {
      this.route.navigate(['../placeorder']);
    }
  }

  setOffer() {
    this.offers.forEach(element => {
      if (element.offerID = this.selectedOption) {
        this.offerDetails = element.percentageApplicable + "% Off, with " + 
        element.preBookPercentageApplicable + "% pre-booking charges.";
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
