import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Offer } from '../model/Offer';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  text: any = {
    Year: 'Year',
    Month: 'Month',
    Weeks: "Weeks",
    Days: "Days",
    Hours: "HH",
    Minutes: "mm",
    Seconds: "ss",
  };

  public enddate:String = "7/15/2018";

  public offers: Offer[] = [];

  private serviceProp = environment.serviceURL;

  constructor(private http: Http) {
  }

  ngOnInit() {
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
          console.log(temp);
          this.offers.push(temp);
        });
      },
      (error) => { console.log(error) })
  }

  public setTimer (endTime:any) {
    console.log(endTime);
    this.enddate = endTime;
  }

}
