import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ItemMenuService } from '../services/item-menu-service';
import { ItemMenu } from '../model/item-menu-model';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.css']
})

export class ItemMenuComponent implements OnInit {
  itemMenus:ItemMenu[];
  @Output() clickEventInner=new EventEmitter<any>();
  constructor(private itemMenuService:ItemMenuService) { 
   
  }

  ngOnInit() {
    this.itemMenus=this.itemMenuService.getCrarckerIconsArray();
  }

  navigate(){
     this.clickEventInner.emit("clicked");
  }

}
