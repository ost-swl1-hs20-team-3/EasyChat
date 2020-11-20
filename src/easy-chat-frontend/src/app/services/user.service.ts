import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserConnectedMessage, UsernameChangedMessage } from '../models/models';
import { SocketioService } from './socketio.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private username = '';
  private oldUsernames = [];

  constructor(private socketioService: SocketioService) { }

  private validateUsername(username: string): boolean {
    return /^[+a-zA-Z]{1}\S{0,29}$/.test(username);
  }

  public setUsername(newUsername: string): string {
    if (!this.validateUsername(newUsername)) {
      return 'Benutzername muss mit einem Buchstaben beginnen und darf keine Leerzeichen enthalten! Maximal 30 Zeichen sind erlaubt!';
    } else {
      if (!this.isLoggedIn()) {
        this.username = newUsername;
        this.socketioService.emitLogin(newUsername); // Emit login event
      } else {
        const oldUsername = this.username;

        if (this.username !== newUsername) {
          this.socketioService.emitUsernameChange(oldUsername, newUsername); // Emit username-change event
          this.username = newUsername;
        }
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
