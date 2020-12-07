import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ChatMessage, Message, MessageType, UserConnectedMessage, UsernameChangedMessage } from '../models/models';
import { SocketioService } from './socketio.service';
import { UserService } from './user.service';
import { SoundService } from './sound.service';

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
  public onlineUserNames: Array<string> = [];

  constructor(
    private userService: UserService,
    private socketioService: SocketioService,
    private soundService: SoundService
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
      this.onlineUserNames = [];

      const onlineUserMap = msg.getOnlineUsers();

      Object.keys(onlineUserMap).forEach((socketId: string) => {
        const actUserName: string = onlineUserMap[socketId].pop();

        if (typeof actUserName !== 'undefined') {
          this.onlineUserNames.push(actUserName);
        }
      });
    });

    this.socketioService.getAllMessagesEvents().pipe(first()).subscribe((allMsgs) => {
      allMsgs.getAllMessages().forEach(msg => {
        switch (msg.type) {
          case MessageType.UserConnected:
            this.addNewUserConnectedMessage(msg, false);
            break;
          case MessageType.UserNameChanged:
            this.addNewUsernameChangedMessage(msg);
            break;
          case MessageType.ChatMessage:
            this.addNewChatMessage(msg, false);
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

  private addNewUserConnectedMessage(msg: any, isNewMessage: boolean = true): void {
    const theMsg = new UserConnectedMessage(msg.username);
    theMsg.timestamp = msg.timestamp;

    if (isNewMessage && this.userService.isLoggedIn() && !this.userService.isMySocketId(msg.senderSocketId)) {
      this.soundService.playUserLogin();
    }

    this.addMessageToMessageList(theMsg);
  }

  private addNewChatMessage(msg: any, isNewMessage: boolean = true): void {
    const theMsg = new ChatMessage(msg.senderSocketId, msg.senderUsername || msg.sender, msg.content);
    theMsg.timestamp = msg.timestamp;

    if (isNewMessage && this.userService.isLoggedIn() && !this.userService.isMySocketId(theMsg.senderSocketId)) {
      this.soundService.playNewMessage();
    }

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
