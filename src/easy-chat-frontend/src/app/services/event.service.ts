import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public focusNow = new Subject<void>();
  public editModal = new Subject<boolean>();

  focusNow$ = this.focusNow.asObservable();
  editModal$ = this.editModal.asObservable();

  constructor() { }

  public setFocusNow(): void {
    this.focusNow.next();
  }

  public setEditModal(isLogin: boolean): void {
    this.editModal.next(isLogin);
  }

}
