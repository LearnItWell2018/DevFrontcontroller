import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {

  profile: any;

   constructor(private authService:AuthService) { }

  ngOnInit() {
    if (this.authService.userProfile) {
      this.profile = this.authService.userProfile;
    } else {
      this.authService.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }

  onSubmit(value: any) {
    console.log(this.profile);
  }

  callOAuth () {
    this.authService.login();
  }

}

