import { Injectable } from '@angular/core';
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

  constructor(private userService: UserService) { }
  
  public sendMessage(message: string): void {
    message = this.cleanInput(message);
    const newMessage = this.createChatMessage(message, 'message');
    this.messageSource.next(message);
    this.messageList.push(newMessage);
  }

  
  public forNewUser(message: string): void {
    const newMessage = this.createChatMessage(message, 'newUser');
    this.messageList.push(newMessage);
  }

  public forUsernameChanged(message: string): void {
    const newMessage = this.createChatMessage(message, 'usernameChanged');
    this.messageList.push(newMessage);
  }

  public typeMessage(message: string): void {
    message = this.cleanInput(message);
    this.messageSource.next(message);
  }

  private cleanInput(message: string): string {
    return message.trim();
  }

  private createChatMessage(content: string, type: string){
    const newMessage = new ChatMessage();
    newMessage.sender = this.userService.getUserName();
    newMessage.content = content;
    newMessage.timestamp = new Date().toISOString();
    newMessage.type = type;
    return newMessage;
  }

}
