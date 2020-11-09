import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FocusService {

  public focusNow = new Subject<void>();

  focusNow$ = this.focusNow.asObservable()

  constructor() { }

  setFocusNow() {
    this.focusNow.next();
  }

}
