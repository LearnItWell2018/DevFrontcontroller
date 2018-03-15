import { Component, OnInit } from '@angular/core';
import { ItemMenuService } from '../services/item-menu-service';
import { ItemMenu } from '../model/item-menu-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  itemMenus:ItemMenu[];
  constructor(private itemMenuService:ItemMenuService) { }

  ngOnInit() {
    this.itemMenus=this.itemMenuService.getCrarckerIconsArray();
  }

  openNav() {
    console.log('iconclicked');
    document.getElementById("mySidenav").style.width = "100%";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
}
