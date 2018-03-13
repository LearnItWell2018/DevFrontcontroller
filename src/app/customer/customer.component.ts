import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  styles: ['input.ng-invalid{border-left:5px solid red;} input.ng-valid{border-left:5px solid green;}']
})

export class CustomerComponent implements OnInit {

   constructor() { }

  ngOnInit() {
  }

  onSubmit(value: any) {
    console.log(value);
  }

}

