import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChatMessage } from '../models/chat-message.model';
import { SocketioService } from './socketio.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messageSource = new BehaviorSubject('');
  private msgEventsSubscription = new Subscription();

  public currentMessage = this.messageSource.asObservable();
  public messageList: Array<ChatMessage> = new Array<ChatMessage>();

  constructor(
    private userService: UserService,
    private socketioService: SocketioService
  ) {
    this.msgEventsSubscription = this.socketioService.getMessageEvents().subscribe((msg) => {
      const newChatMsg = new ChatMessage();
      newChatMsg.sender = msg.sender;
      newChatMsg.content = msg.content;
      newChatMsg.timestamp = msg.timestamp;
      this.messageList.push(newChatMsg);
    });
  }

  public sendMessage(message: string): void {
    message = this.cleanInput(message);

    const newMessage = new ChatMessage();
    newMessage.sender = this.userService.getUserName();
    newMessage.content = message;
    newMessage.timestamp = new Date().toISOString();

    this.messageSource.next(message);

    if (environment.FEATURE_FLAGS.USE_SOCKET_IO) {
      this.socketioService.emitChatMessage(newMessage);
    } else {
      this.messageList.push(newMessage);
    }
  }

  public typeMessage(message: string): void {
    message = this.cleanInput(message);
    this.messageSource.next(message);
  }


  private cleanInput(message: string): string {
    return message.trim();
  }
}
