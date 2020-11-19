import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private focusNow = new Subject<void>();
  private editModal = new Subject<boolean>();

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

