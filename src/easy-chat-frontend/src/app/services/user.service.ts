import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public onUsernameChanged = new EventEmitter<UsernameChangedEvent>()

  private username = '';

  constructor() { }

  private validateUsername(username: string): boolean {
    return /^[+a-zA-Z]{1}\S{0,29}$/.test(username);
  }

  public setUsername(username: string): string {
    if (!this.validateUsername(username)) {
      return 'Benutzername muss mit einem Buchstaben beginnen und darf keine Leerzeichen enthalten! Maximal 30 Zeichen sind erlaubt!';
    } else {
      if (this.username !== username){
        this.onUsernameChanged.emit({oldUsername: this.username, newUsername: username});
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

export class UsernameChangedEvent{
  public oldUsername: string;
  public newUsername: string;
}
