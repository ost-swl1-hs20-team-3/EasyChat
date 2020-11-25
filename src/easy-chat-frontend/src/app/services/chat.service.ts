import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketioService } from './socketio.service';
import { ChatMessage, Message, UserConnectedMessage, UsernameChangedMessage } from '../models/models';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private changeUsernameEventSubscription = new Subscription();
  private chatMessageEventsSubscription = new Subscription();
  private loginEventsSubscription = new Subscription();

  private messageStorage: MessageStorage = new MessageStorage();
  public get messageList(): Array<Message> { return this.messageStorage.getAll() };

  constructor(
    private userService: UserService,
    private socketioService: SocketioService
  ) {
    this.chatMessageEventsSubscription = this.socketioService.getMessageEvents().subscribe((msg) => {
      const theMsg = new ChatMessage(msg.senderSocketId, msg.getSenderUsername(), msg.getContent());
      theMsg.timestamp = msg.timestamp;

      this.addMessageToMessageList(theMsg);
    });

    this.loginEventsSubscription = this.socketioService.getLoginEvents().subscribe((msg) => {
      const theMsg = new UserConnectedMessage(msg.getUserName());
      theMsg.timestamp = msg.timestamp;

      this.addMessageToMessageList(theMsg);
    });

    this.changeUsernameEventSubscription = this.socketioService.getUserNameChangedEvents().subscribe((msg) => {
      const theMsg = new UsernameChangedMessage(msg.getOldUsername(), msg.getNewUsername());
      theMsg.timestamp = msg.timestamp;

      this.addMessageToMessageList(theMsg);
    });
  }

  private cleanInput(message: string): string {
    return message.trim();
  }

  private addMessageToMessageList(message: Message): void {
    this.messageStorage.push(message);
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
  
}

class MessageStorage {

  private messageList: Array<Message> = new Array<Message>();

  public push(message: Message): void {
    this.messageList.push(message);
    if (this.messageList.length > environment.MESSAGE_LIMIT){
      this.messageList.splice(0, this.messageList.length - environment.MESSAGE_LIMIT);
    }
  }

  public getAll(): Array<Message>{
    return Array.from(this.messageList);
  }

}