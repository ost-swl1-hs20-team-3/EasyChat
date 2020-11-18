import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private focusNow = new Subject<void>();
  private editModal = new Subject<boolean>();
  private changeUsername = new Subject<UsernameChangedEvent>();

  focusNow$ = this.focusNow.asObservable();
  editModal$ = this.editModal.asObservable();
  changeUsername$ = this.changeUsername.asObservable();

  constructor() { }

  public setFocusNow(): void {
    this.focusNow.next();
  }

  public setEditModal(isLogin: boolean): void {
    this.editModal.next(isLogin);
  }

  public setUsernameChanged(oldUsername: string, newUsername: string){
    this.changeUsername.next({oldUsername: oldUsername, newUsername: newUsername});
  }

}

export class UsernameChangedEvent{
  public oldUsername: string;
  public newUsername: string;
}

