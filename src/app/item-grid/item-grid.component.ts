import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.css']
})
export class ItemGridComponent implements OnInit {
  itemtype:string; 
  constructor(private router:ActivatedRoute) { }

  ngOnInit() {
    this.itemtype=this.router.snapshot.params['crackers'];
    this.router.params.subscribe((params:Params)=>{
      this.itemtype=params['crackers']
    })
  }

}
