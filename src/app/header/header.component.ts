import { Component, OnInit } from '@angular/core';
import { ItemMenuService } from '../services/item-menu-service';
import { ItemMenu } from '../model/item-menu-model';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { UserProfile } from '../model/user-profile-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  itemMenus:ItemMenu[];
  userProfile:UserProfile;

  constructor(private itemMenuService:ItemMenuService,private route:Router,private activated:ActivatedRoute, private auth:AuthService) { }

  ngOnInit() {
    this.itemMenus=this.itemMenuService.getCrarckerIconsArray();
    this.userProfile = this.auth.getProfile();
    console.log(this.auth.getProfile());
  }

  openNav() {
    console.log('iconclicked');
    document.getElementById("mySidenav").style.width = "100%";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  routeToKart(){
    this.route.navigate(['../kart']);
  }

  routeToHome(){
    this.route.navigate(['../']);
  }
  
}
