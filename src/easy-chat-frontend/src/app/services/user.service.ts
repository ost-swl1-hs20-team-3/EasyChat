import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private username = '';
  private changeUsername = new Subject<UsernameChangedEvent>();

  public changeUsername$ = this.changeUsername.asObservable();

  constructor() { }

  private validateUsername(username: string): boolean {
    return /^[+a-zA-Z]{1}\S{0,29}$/.test(username);
  }

  public setUsername(username: string): string {
    if (!this.validateUsername(username)) {
      return 'Benutzername muss mit einem Buchstaben beginnen und darf keine Leerzeichen enthalten! Maximal 30 Zeichen sind erlaubt!';
    } else {
      if (this.username !== username) {
        this.changeUsername.next({ oldUsername: this.username, newUsername: username });
        this.username = username;
      }
      return '';
    }
  }

  public getUserName(): string {
    return this.username;
  }

  public isLoggedIn(): boolean {
    return this.username.trim().length > 0;
  }

}

export interface UsernameChangedEvent {
  oldUsername: string;
  newUsername: string;
}
