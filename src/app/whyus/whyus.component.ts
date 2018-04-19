import { Component, OnInit,ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-whyus',
  templateUrl: './whyus.component.html',
  styleUrls: ['./whyus.component.css']
})
export class WhyusComponent {
  @ViewChild("myObject") myObject:ElementRef;
  public allQuotes: string[] = ['700 minimum order', 'fast delivery', 'quality of delivery'];
  public elems: number = 0;
  public intervals: any;
  public quotesVal: string;
  constructor() { }

  public rollOnMouseOver(event) {
    this.intervals = setInterval(() => {
      this.quotesVal = this.allQuotes[this.elems]
      if (this.elems === 2) { this.elems = 0; } else { this.elems++; }
      console.log(this.myObject.nativeElement);
      this.myObject.nativeElement.classList.add("animated", "infinite", "bounce");
    }, 1999);
  };




  public stopRoll(event) {
    clearInterval(this.intervals);
    this.myObject.nativeElement.classList.remove("animated", "infinite", "bounce");
  };


}
