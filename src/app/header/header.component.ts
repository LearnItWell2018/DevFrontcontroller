import { Component, OnInit } from '@angular/core';
import { ItemMenuService } from '../services/item-menu-service';
import { ItemMenu } from '../model/item-menu-model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { UserProfile } from '../model/user-profile-model';
import { UtilityService } from '../services/utility-service';
import { GridItem } from '../model/item-grid-models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  itemMenus: ItemMenu[];
  userProfile: UserProfile;
  public myKartList: GridItem[];
  activeUserPresent: Boolean;
  activeUserName: String;
  animateproductmenu = '';
  kartCount: number = 0;

  constructor(private itemMenuService: ItemMenuService, private route: Router, private utility: UtilityService, private activated: ActivatedRoute, public auth: AuthService) { }

  ngOnInit() {
    this.itemMenus = this.itemMenuService.getCrarckerIconsArray();
    this.userProfile = this.auth.getProfile();
    if (this.userProfile) {
      this.activeUserPresent = true;
      this.activeUserName = this.userProfile.name;
    } else {
      this.activeUserPresent = false;
      this.activeUserName = "Anyone Home ?";
    }

    this.kartCount = this.initialCartItemCount();

    this.utility.itemAdded.subscribe((data: string) => {
      this.kartCount = this.utility.totalItemCount();
    })

    console.log(this.auth.getProfile());
  }

  openNav() {
    console.log('iconclicked');
    this.animateproductmenu = 'open';
    document.getElementById("mySidenav").style.width = "100%";
  }

  closeNav() {
    this.animateproductmenu = '';
    document.getElementById("mySidenav").style.width = "0";
  }

  routeToKart() {
    this.route.navigate(['../kart']);
  }

  routeToHome() {
    this.route.navigate(['../']);
  }

  routeToBrowse() {
    this.route.navigate(['../browse']);
  }

  logOut() {
    this.auth.logout();
    this.activeUserName = "Anyone Home ?";
  }
  logIn() {
    this.auth.login();
  }

  getactiveUserName(): String {
    this.userProfile = this.auth.getProfile();
    if (this.userProfile) {
      this.activeUserPresent = true;
      return this.userProfile.name;
    } else {
      this.activeUserPresent = false;
      return "Anyone Home ?";
    }
  }

  initialCartItemCount(): number {
    let numberOfitems: number = 0;
    let myKart = localStorage.getItem('myKart');
    if (myKart != null) {
        this.myKartList = JSON.parse('[' + myKart + ']');
        this.myKartList.forEach(function (item) {
            numberOfitems = numberOfitems + item.itemQuantity;
        });
    }
    return numberOfitems;
  }



}
