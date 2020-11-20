import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SocketioService } from './socketio.service';
import { environment } from 'src/environments/environment';
import { ChatMessage, Message, UserConnectedMessage, UsernameChangedMessage } from '../models/chat-message.model';
import { UsernameChangedEvent, UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private messageSource = new BehaviorSubject('');
    private changeUsernameSubscription: Subscription;
    private msgEventsSubscription = new Subscription();

    public currentMessage = this.messageSource.asObservable();
  public messageList: Array<Message> = new Array<Message>();

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

        this.changeUsernameSubscription = this.userService.changeUsername$.subscribe((event: UsernameChangedEvent) => {
            this.handleUsernameEvent(event);
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

    public handleUsernameEvent(event: UsernameChangedEvent): void {
        if (event.oldUsername === '') {
            this.sendInfoMessageForNewUser(`${event.newUsername} ist diesem Chat beigetreten`);
        } else {
            this.sendInfoMessageForUsernameChanged(`${event.oldUsername} änderte den Benutzernamen zu ${event.newUsername}`);
        }
    }

}
