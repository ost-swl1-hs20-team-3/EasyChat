import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private messageSource = new BehaviorSubject('');

  public currentMessage = this.messageSource.asObservable();

  constructor() { }

  public sendMessage(): void {
    // Temporary - should send data to backend
    alert(this.messageSource.value);
  }

  public typeMessage(message: string): void {
    this.messageSource.next(message);
  }
}
