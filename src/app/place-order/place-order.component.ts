import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
  styles: ['input.ng-invalid{border-left:5px solid red;} input.ng-valid{border-left:5px solid green;}']
})
export class PlaceOrderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(value: any) {
    console.log(value);
  }

}
