import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public focusNow = new Subject<void>();
  public editModal = new Subject<boolean>();

  focusNow$ = this.focusNow.asObservable()
  editModal$ = this.editModal.asObservable()

  constructor() { }

  setFocusNow() {
    this.focusNow.next();
  }

  setEditModal(bool: boolean) {
    this.editModal.next(bool);
  }


}
