import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {

   constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  onSubmit(value: any) {
    console.log(value);
  }

  callOAuth () {
    console.log("callOAuth");
    this.authService.login();
  }

}

