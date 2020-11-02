import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private username: string = '';

  constructor() { }

  public setUsername(username: string): boolean {
    this.username = username;
    return true;
  }

  public getUserName(): string {
    return this.username;
  }

  public isLoggedIn(): boolean {
    return this.username.trim().length > 0;
  }
}
