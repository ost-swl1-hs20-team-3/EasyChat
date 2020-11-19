import { Injectable } from '@angular/core';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private username = '';

  constructor(private eventService: EventService) { }

  private validateUsername(username: string): boolean {
    return /^[+a-zA-Z]{1}\S{0,29}$/.test(username);
  }

  public setUsername(username: string): string {
    if (!this.validateUsername(username)) {
      return 'Benutzername muss mit einem Buchstaben beginnen und darf keine Leerzeichen enthalten! Maximal 30 Zeichen sind erlaubt!';
    } else {
      if (this.username !== username) {
        this.eventService.setUsernameChanged(this.username, username);
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
