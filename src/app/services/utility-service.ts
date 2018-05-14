import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UtilityService {
    itemAdded=new Subject<string>();
    constructor() {}

    notyifyAll(){
        this.itemAdded.next('added');
    }
}