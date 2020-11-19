import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ChatMessage, Message, UserConnectedMessage, UsernameChangedMessage } from '../models/chat-message.model';
import { UsernameChangedEvent, UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messageSource = new BehaviorSubject('');
  private changeUsernameSubscription: Subscription;

  public currentMessage = this.messageSource.asObservable();
  public messageList: Array<Message> = new Array<Message>();

  constructor(
    private userService: UserService
  ) {
    this.changeUsernameSubscription = this.userService.changeUsername$.subscribe((event: UsernameChangedEvent) => {
      this.handleUsernameChangedEvent(event);
    });
  }

  public sendMessage(message: string): void {
    const newMessage = new ChatMessage();
    newMessage.sender = this.userService.getUserName();
    newMessage.content = this.cleanInput(message);
    newMessage.timestamp = new Date().toISOString();

    this.messageSource.next(message);
    this.messageList.push(newMessage);
  }

  public sendInfoMessageForNewUser(message: string): void {
    const newMessage = new UserConnectedMessage();
    newMessage.sender = this.userService.getUserName();
    newMessage.content = message;
    newMessage.timestamp = new Date().toISOString();

    this.messageList.push(newMessage);
  }

  public sendInfoMessageForUsernameChanged(message: string): void {
    const newMessage = new UsernameChangedMessage();
    newMessage.sender = this.userService.getUserName();
    newMessage.content = message;
    newMessage.timestamp = new Date().toISOString();

    this.messageList.push(newMessage);
  }

  public typeMessage(message: string): void {
    message = this.cleanInput(message);
    this.messageSource.next(message);
  }

  private cleanInput(message: string): string {
    return message.trim();
  }

  public handleUsernameChangedEvent(event: UsernameChangedEvent): void {
    if (event.oldUsername === '') {
      this.sendInfoMessageForNewUser(`${event.newUsername} ist diesem Chat beigetreten`);
    } else {
      this.sendInfoMessageForUsernameChanged(`${event.oldUsername} änderte den Benutzernamen zu ${event.newUsername}`);
    }
  }

}
