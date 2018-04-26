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
        console.log('itemsWithImage:'+itemsWithImage);
      },
       (error)=>{console.log(error)})
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : itemsWithImage.filter(v => v.itemName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  formatter = (x: {itemName: string}) => x.itemName;

  addItemOnClicked(object){
    console.log(object.target);
  }

  addProductToWebStore(index:number,inputElem:HTMLFormElement){
    if(itemsWithImage[index].itemQuantity===0){
      alert('Error');
    }else{
      if(!localStorage.getItem('myKart')){
        localStorage.setItem('myKart',JSON.stringify(itemsWithImage[index]));
        itemsWithImage[index].itemQuantity=0;
      }else{
        let myKart=localStorage.getItem('myKart');
        let presentItem=itemsWithImage[index];
        if(myKart.indexOf(itemsWithImage.productId)>=0){
          let myObject=JSON.parse('['+myKart+']');
          myObject.forEach(function(item){
            if(item.productId===presentItem.productId){
              item.itemQuantity=item.itemQuantity+presentItem.itemQuantity;
              let stripObj=JSON.stringify(myObject).split('[')[1].split(']')[0];
              localStorage.setItem('myKart',stripObj);
              presentItem.itemQuantity=0;
              return;
            }
          });
        }
        else{
        myKart=myKart+","+JSON.stringify(itemsWithImage[index]);
        localStorage.setItem('myKart',myKart);
        itemsWithImage[index].itemQuantity=0;
        }
      }
    }
  }
}
