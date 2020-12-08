import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ChatMessage, Message, MessageType, UserConnectedMessage, UsernameChangedMessage } from '../models/models';
import { SocketioService } from './socketio.service';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private changeUsernameEventSubscription = new Subscription();
  private chatMessageEventsSubscription = new Subscription();
  private loginEventsSubscription = new Subscription();
  private reservedUsernamesSubscription = new Subscription();

  private messageStorage: MessageStorage = new MessageStorage();

  public get messageList(): Array<Message> { return this.messageStorage.getAll(); }
  private activeUsers: Array<any> = [];
  public get onlineUsersSorted(): Array<any> {
    return this.activeUsers.sort(compareUsers());
  }

  constructor(
    private userService: UserService,
    private socketioService: SocketioService
  ) {
    this.chatMessageEventsSubscription = this.socketioService.getMessageEvents().subscribe((msg) => {
      this.addNewChatMessage(msg);
    });

    this.loginEventsSubscription = this.socketioService.getLoginEvents().subscribe((msg) => {
      this.addNewUserConnectedMessage(msg);
    });

    this.changeUsernameEventSubscription = this.socketioService.getUserNameChangedEvents().subscribe((msg) => {
      this.addNewUsernameChangedMessage(msg);
    });

    this.reservedUsernamesSubscription = this.socketioService.getOnlineUsers().subscribe((msg) => {
      this.activeUsers = [];

      const onlineUserMap = msg.getOnlineUsers();

      Object.keys(onlineUserMap).forEach((socketId: string) => {
        const user: any = onlineUserMap[socketId];
        this.activeUsers.push({ username: user.currentUsername, onFire: user.onFire });
      });
    });

    this.socketioService.getAllMessagesEvents().pipe(first()).subscribe((allMsgs) => {
      allMsgs.getAllMessages().forEach(msg => {
        switch (msg.type) {
          case MessageType.UserConnected:
            this.addNewUserConnectedMessage(msg);
            break;
          case MessageType.UserNameChanged:
            this.addNewUsernameChangedMessage(msg);
            break;
          case MessageType.ChatMessage:
            this.addNewChatMessage(msg);
            break;
          default: throw new TypeError(`type '${msg.type}' not known`);
        }
      });
    });

    socketioService.emitGetAllMessages();
  }

  private addNewUsernameChangedMessage(msg: any): void {
    const theMsg = new UsernameChangedMessage(msg.oldUsername, msg.newUsername);
    theMsg.timestamp = msg.timestamp;

    this.addMessageToMessageList(theMsg);
  }

  private addNewUserConnectedMessage(msg: any): void {
    const theMsg = new UserConnectedMessage(msg.username);
    theMsg.timestamp = msg.timestamp;

    this.addMessageToMessageList(theMsg);
  }

  private addNewChatMessage(msg: any): void {
    const theMsg = new ChatMessage(msg.senderSocketId, msg.senderUsername || msg.sender, msg.content);
    theMsg.timestamp = msg.timestamp;

    this.addMessageToMessageList(theMsg);
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
    if (this.messageList.length > environment.MESSAGE_LIMIT) {
      this.messageList.splice(0, this.messageList.length - environment.MESSAGE_LIMIT);
    }
  }

  public getAll(): Array<Message> {
    return Array.from(this.messageList);
  }

}

function compareUsers(): (a: any, b: any) => number {
  return (a, b): number => {
    if (b.onFire) {
      return 1;
    } else {
      if (a.username < b.username) {
        return -1;
      } else if (a.username === b.username) {
        return 0;
      } else {
        return 1;
      }
    }
  };
}

