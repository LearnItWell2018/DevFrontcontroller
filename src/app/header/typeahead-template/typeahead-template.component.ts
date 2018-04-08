import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { OnInit } from '@angular/core';
import { Http,Headers } from '@angular/http';

let itemsWithImage;

@Component({
  selector: 'ngbd-typeahead-template',
  templateUrl: './typeahead-template.component.html',
  styleUrls: ['./typeahead-template.component.css']
})
export class TypeaheadTemplateComponent  implements OnInit {
  public model: any;
  
  constructor(private http:Http){ }
  ngOnInit(){
    this.http.get('https://kundalini.cfapps.io/rs/items/list').subscribe(
       (response)=>{
        itemsWithImage=response.json();
        console.log(itemsWithImage);
      },
       (error)=>{console.log(error)})
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : itemsWithImage.filter(v => v.itemName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  formatter = (x: {itemName: string}) => x.itemName;

  

}
