import { Component, OnInit } from '@angular/core';
import { ItemMenuService } from '../services/item-menu-service';
import { ItemMenu } from '../model/item-menu-model';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.css'],
  providers:[ItemMenuService]
})
export class ItemMenuComponent implements OnInit {
  itemMenus:ItemMenu[];
  constructor(private itemMenuService:ItemMenuService) { 
   
  }

  ngOnInit() {
    this.itemMenus=this.itemMenuService.getCrarckerIconsArray();
  }

}
