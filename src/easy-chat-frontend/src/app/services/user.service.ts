import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { fromEventPattern } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private username: string = '';

  constructor() { }

  private validateUsername(username: string): boolean {
    return /^[+a-zA-Z]{1}\S*$/.test(username);
  }

  public setUsername(username: string): string {
    if (!this.validateUsername(username)) {
      return 'Benutzername muss mit einem Buchstaben beginnen und darf danach keine Leerraumzeichen enthalten!';
    } else {
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
