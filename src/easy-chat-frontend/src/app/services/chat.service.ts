import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messageSource = new BehaviorSubject('');

  public currentMessage = this.messageSource.asObservable();
  public messageList: Array<ChatMessage> = new Array<ChatMessage>();

  constructor(private userService: UserService) {
    // this.setUpTestMessages(); // TEMP
  }

  public sendMessage(message: string): void {
    message = this.cleanInput(message);

    const newMessage = new ChatMessage();
    newMessage.sender = this.userService.getUserName();
    newMessage.content = message;
    newMessage.timestamp = new Date().toISOString();

    this.messageSource.next(message);
    this.messageList.push(newMessage);
  }

  public typeMessage(message: string): void {
    message = this.cleanInput(message);
    this.messageSource.next(message);
  }


  private cleanInput(message: string): string {
    return message.trim();
  }


  // TEMP
  private setUpTestMessages(): void {
    let msgA: ChatMessage = new ChatMessage()
    msgA.sender = this.userService.getUserName();
    msgA.content = "Ich habe das geschrieben";
    msgA.timestamp = new Date().toISOString();
    this.messageList.push(msgA);

    let msgB: ChatMessage = new ChatMessage()
    msgB.sender = "OTHER";
    msgB.content = "Jemand anderes hat das geschrieben";
    msgB.timestamp = new Date().toISOString();
    this.messageList.push(msgB);

    let msgC: ChatMessage = new ChatMessage()
    msgC.sender = this.userService.getUserName();
    msgC.content = "Diesen sehr sehr sehr sehr sehr sehr sehr sehr sehr sehr sehr sehr sehr sehr sehr sehr langen Text habe ich geschrieben.";
    msgC.timestamp = new Date().toISOString();
    this.messageList.push(msgC);

    let msgD: ChatMessage = new ChatMessage()
    msgD.sender = "OTHER";
    msgD.content = "Diesen sehr sehr sehr sehr sehr sehr sehr sehr sehr sehr sehr sehr sehr sehr sehr sehr langen Text hat jemand anderes geschrieben.";
    msgD.timestamp = new Date().toISOString();
    this.messageList.push(msgD);


    this.messageList.push(msgA);
    this.messageList.push(msgA);
    this.messageList.push(msgB);
    this.messageList.push(msgC);
    this.messageList.push(msgC);
    this.messageList.push(msgD);
    this.messageList.push(msgD);
  }
}
