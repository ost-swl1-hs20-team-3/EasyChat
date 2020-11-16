import { Injectable } from '@angular/core';
import { SocketioService } from './socketio.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private username = '';

  constructor(private socketioService: SocketioService) { }

  private validateUsername(username: string): boolean {
    return /^[+a-zA-Z]{1}\S{0,29}$/.test(username);
  }

  public setUsername(username: string): string {
    if (!this.validateUsername(username)) {
      return 'Benutzername muss mit einem Buchstaben beginnen und darf keine Leerzeichen enthalten! Maximal 30 Zeichen sind erlaubt!';
    } else {
      if (!this.isLoggedIn()) {
        this.socketioService.emitLogin(username); // Emit login event
      } else {
        const oldUsername = this.username;
        this.socketioService.emitUsernameChange(oldUsername, username); // Emit username-change event
      }

      this.username = username;
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
