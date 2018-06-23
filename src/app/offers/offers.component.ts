import { Component, OnInit } from '@angular/core';

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

  constructor() {

  }

  ngOnInit() {

  }



}
