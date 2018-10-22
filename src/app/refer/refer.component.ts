import { Component, OnInit } from '@angular/core';
import { PlaceOredrService } from '../services/placeorder-service';
import { Refer } from '../model/Refer';
import { AuthService } from '../services/auth-service';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-refer',
  templateUrl: './refer.component.html',
  styleUrls: ['./refer.component.css']
})
export class ReferComponent implements OnInit {

  constructor(private placeOredrService: PlaceOredrService, private auth: AuthService, private http: Http) {
    this.fetchReferList();
  }

  private serviceProp = environment.serviceURL;
  public referList: Refer[] = [];

  ngOnInit() {
    this.fetchReferList();
  }

  onSubmit(customerFrom) {
    console.log(customerFrom);
    let refer: Refer = new Refer();
    refer.customerReferMail = customerFrom.email;
    refer.customerReferMobile = customerFrom.mobileref;
    refer.customerMail = this.auth.getProfile().nickname + "@gmail.com";
    refer.customerMobile = customerFrom.mobile;
    this.placeOredrService.referFriend(refer);
    this.referList.push(refer);
  }

  fetchReferList() {
    this.http.get(this.serviceProp + '/rs/refer/' + this.auth.getProfile().nickname + "@gmail.com").subscribe(
      (response) => {
        // console.log('orderList : ' + JSON.stringify(response.json()));
        this.referList = response.json();
      },
      (error) => { console.log(error); return "error"; })

  }

}
