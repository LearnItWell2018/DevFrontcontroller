import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridItem } from '../model/item-grid-models';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../services/utility-service';
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Offer } from '../model/Offer';
import { PlaceOredrService } from '../services/placeorder-service';
import { GoTopButtonModule } from 'ng2-go-top-button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-items-cart',
  templateUrl: './items-cart.component.html',
  styleUrls: ['./items-cart.component.css']
})
export class ItemsCartComponent implements OnInit, OnDestroy {

  public myKartList: GridItem[];
  public totalValue: number = 0;
  public subtotalValue: number = 0;
  private subscription: Subscription;
  private serviceProp = environment.serviceURL;
  public offers: Offer[] = [];
  public deliveryDates: String[] = [];
  public selectedOption: String;
  public offerDetails: String;
  public applyOfferFlag: Boolean = false;
  public discountValue: number = 0;
  public selectedDateOption: String;

  constructor(private route: Router, private activated: ActivatedRoute, private utility: UtilityService, private http: Http, private placeOredrService: PlaceOredrService) {
    localStorage.setItem("customerOrder", "");
  }

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
      myKart = localStorage.getItem('myKart');
      this.myKartList = JSON.parse('[' + myKart + ']');
      //console.log(this.myKartList);
      this.myKartList.forEach(function (item) {
        item["totalFinalVal"] = item.itemQuantity * item.itemPrice;
      });
      this.syncWithKart();
      this.calculateTotal();
    })

    this.http.get(this.serviceProp + '/rs/offer').subscribe(
      (response) => {
        //console.log(response.json());
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
    this.utility.notyifyAll();
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
    this.utility.notyifyAll();
  }

  removeThisProduct(i) {
    this.myKartList.splice(i, 1);
    this.syncWithKart();
    this.calculateTotal();
    this.utility.notyifyAll();
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
    //console.log(totalVal);
    this.subtotalValue = totalVal;
    this.calculateOffer();
    this.myKartList.forEach(item => {
      if(item.offer==0){
        this.discountValue = 0;
      }
    });
    this.totalValue = totalVal - this.discountValue;
  }

  gotoPlaceOrder() {
    if (this.totalValue >= 500) {
      if (this.applyOfferFlag) {
        if (this.selectedDateOption != null) {
          this.placeOredrService.fillCustomerOrderFromCart(this.totalValue.toString(), this.selectedDateOption);
          this.route.navigate(['../placeorder']);
        }
      } else {
        this.placeOredrService.fillCustomerOrderFromCart(this.totalValue.toString(), "");
        this.route.navigate(['../placeorder']);
      }

    }
  }

  setOffer() {
    this.calculateTotal();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  applyOffer() {
    this.applyOfferFlag = true;
    this.calculateTotal();
  }

  removeOffer() {
    this.applyOfferFlag = false;
    this.discountValue = 0;
    this.selectedOption = '';
    this.offerDetails = '';
    this.calculateTotal();
  }

  calculateOffer() {
    //console.log("Value of date" + this.selectedDateOption);
    this.discountValue = 0;
    this.totalValue = this.subtotalValue;
    this.offers.forEach(element => {
      if (element.offerID == this.selectedOption) {
        this.discountValue = this.totalValue * (Number(element.percentageApplicable)) / 100;
        this.offerDetails = element.percentageApplicable + "% Off, with " +
          element.preBookPercentageApplicable + "% pre-booking charges.";
        this.deliveryDates = element.deliveryDates;
      }
    });
  }

}
