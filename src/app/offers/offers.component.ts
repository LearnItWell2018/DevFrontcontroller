import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {


  text:any = {
    Year: 'Year',
    Month: 'M',
    Weeks: "W",
    Days: "D",
    Hours: "HH",
    Minutes: "MM",
    Seconds: "SS",
    MilliSeconds: "MilliSeconds"
  };

  constructor() {

   }

  ngOnInit() {

  }


  
}
