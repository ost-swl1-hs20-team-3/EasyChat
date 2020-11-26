import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from './event.service';
import { SocketioService } from './socketio.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private reservedUsernamesSubscription = new Subscription();
  private username = '';
  private reservedUsernames: string[] = [];
  private oldUsernames: Set<string> = new Set<string>();

  constructor(
    private socketioService: SocketioService,
    private eventService: EventService) 
    {
    this.reservedUsernamesSubscription = this.socketioService.getReservedUsernames().subscribe((msg) => {
      this.reservedUsernames = msg.getReservedUsernames();
    });
  }

  private isUsernameValid(username: string): boolean {
    return /^[+a-zA-Z]{1}\S{0,29}$/.test(username);
  }

  private isUsernameReserved(username: string): boolean {
    return this.reservedUsernames.includes(username);
  }

  private isUsernameReservedForMe(username: string): boolean {
    return this.oldUsernames.has(username);
  }

  public setUsername(newUsername: string): string {
    if (!this.isUsernameValid(newUsername)) {
      return 'Benutzername muss mit einem Buchstaben beginnen und darf keine Leerzeichen enthalten! Maximal 30 Zeichen sind erlaubt!';
    }
    if (this.isUsernameReserved(newUsername) && !this.isUsernameReservedForMe(newUsername)) {
      return 'Benutzername ist reserviert!';
    }

    if (!this.isLoggedIn()) {
      this.username = newUsername;
      this.socketioService.emitLogin(newUsername); // Emit login event
      this.eventService.setBlurNow(false);
    } else {
      if (this.username !== newUsername) {
        const oldUsername = this.username;
        this.socketioService.emitUsernameChange(oldUsername, newUsername); // Emit username-change event
        this.username = newUsername;
      }
    }

    this.oldUsernames.add(this.username);
    return '';
  }

  public getUserName(): string {
    return this.username;
  }

  public isLoggedIn(): boolean {
    return this.username.trim().length > 0;
  }

  public isMySocketId(socketId: string): boolean {
    return this.socketioService.isMySocketId(socketId);
  }

}

export interface UsernameChangedEvent {
  oldUsername: string;
  newUsername: string;
}
