import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SocketioService } from './socketio.service';
import { environment } from 'src/environments/environment';
import { ChatMessage, Message, UserConnectedMessage, UsernameChangedMessage } from '../models/models';
import { UsernameChangedEvent, UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private changeUsernameEventSubscription: Subscription;
  private chatMessageEventsSubscription = new Subscription();
  private loginEventsSubscription = new Subscription();

  public messageList: Array<Message> = new Array<Message>();

  constructor(
    private userService: UserService,
    private socketioService: SocketioService
  ) {

    this.chatMessageEventsSubscription = this.socketioService.getMessageEvents().subscribe((msg) => {
      const theMsg = new ChatMessage(msg.getSender(), msg.getContent());
      theMsg.timestamp = msg.timestamp;
      // theMsg.sender = msg.sender;
      // theMsg.timestamp = msg.timestamp;
      this.messageList.push(theMsg);
    });

    this.loginEventsSubscription = this.socketioService.getLoginEvents().subscribe((msg) => {
      const theMsg = new UserConnectedMessage(msg.getUserName());
      theMsg.timestamp = msg.timestamp;

      this.messageList.push(theMsg);
    });

    this.changeUsernameEventSubscription = this.socketioService.getUserNameChangedEvents().subscribe((msg) => {
      const theMsg = new UsernameChangedMessage(msg.getOldUsername(), msg.getNewUsername());
      theMsg.timestamp = msg.timestamp;

      this.messageList.push(theMsg);
    });
  }

  public sendMessage(message: string): void {
    const sender = this.userService.getUserName();
    const msg = this.cleanInput(message);

    this.socketioService.emitChatMessage(sender, msg);
  }

  public sendInfoMessageForNewUser(username: string): void {
    this.socketioService.emitLogin(username);
  }

  public sendInfoMessageForUsernameChanged(oldUserName: string, newUsername: string): void {
    this.socketioService.emitUsernameChange(oldUserName, newUsername);
  }

  private cleanInput(message: string): string {
    return message.trim();
  }

}
