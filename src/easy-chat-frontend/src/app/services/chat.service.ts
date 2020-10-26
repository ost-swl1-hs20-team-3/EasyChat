import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messageSource = new BehaviorSubject('');

  public currentMessage = this.messageSource.asObservable();
  public messageList: Array<ChatMessage> = new Array<ChatMessage>();

  constructor() { }

  public sendMessage(message: string): void {
    message = this.cleanInput(message);

    const newMessage = new ChatMessage();
    newMessage.sender = 'ME';
    newMessage.content = message;
    newMessage.timestamp = new Date().toISOString();

    this.messageSource.next(message);
    this.messageList.push(newMessage);

    alert(this.messageSource.value);
  }

  public typeMessage(message: string): void {
    message = this.cleanInput(message);
    this.messageSource.next(message);
  }


  private cleanInput(message: string): string {
    return message.trim();
  }
}
