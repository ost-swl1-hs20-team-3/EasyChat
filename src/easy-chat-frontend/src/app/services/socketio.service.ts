import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import {
  LoginBroadcastResponse,
  LoginRequest,
  MessageBroadcastResponse,
  MessageRequest, OnlineUserChangedResponse,
  SocketRequest,
  UsernameChangeResponse,
  UsernameChangeRequest
} from '../models/api-models';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.setupSocketConnection();
  }

  private setupSocketConnection(): void {
    this.socket = io.connect(environment.SOCKET_ENDPOINT, { transports: ['websocket'] });
  }

  private emit(msg: SocketRequest): void {
    this.socket.emit(msg.getEventName(), msg.getRequestObject());
  }

  private logEvent(eventName: string, eventObject: any): void {
    if (!environment.production) {
      console.log(`${eventName}: `, eventObject);
    }
  }


  public emitChatMessage(sender: string, content: string): void {
    this.emit(new MessageRequest({ sender, content }));
  }

  public emitLogin(username: string): void {
    this.emit(new LoginRequest({ username }));
  }

  public emitUsernameChange(oldUsername: string, newUsername: string): void {
    this.emit(new UsernameChangeRequest({ oldUsername, newUsername }));
  }


  public getOnlineUsers(): Observable<OnlineUserChangedResponse> {
    const eventName = new OnlineUserChangedResponse({}).getEventName();

    return new Observable((observer) => {
      this.socket.on(eventName, (data: any) => {
        this.logEvent(`${eventName}: `, OnlineUserChangedResponse);
        observer.next(new OnlineUserChangedResponse(data));
      });
    });
  }

  public getLoginEvents(): Observable<LoginBroadcastResponse> {
    const eventName = new LoginBroadcastResponse({}).getEventName();

    return new Observable((observer) => {
      this.socket.on(eventName, (data: LoginBroadcastResponse) => {
        this.logEvent(`${eventName}: `, data);
        observer.next(new LoginBroadcastResponse(data));
      });
    });
  }

  public getUserNameChangedEvents(): Observable<UsernameChangeResponse> {
    const eventName = new UsernameChangeResponse({}).getEventName();

    return new Observable((observer) => {
      this.socket.on(eventName, (data: UsernameChangeResponse) => {
        this.logEvent(`${eventName}: `, data);
        observer.next(new UsernameChangeResponse(data));
      });
    });
  }

  public getMessageEvents(): Observable<MessageBroadcastResponse> {
    const eventName = new MessageBroadcastResponse({}).getEventName();

    return new Observable((observer) => {
      this.socket.on(eventName, (data: MessageBroadcastResponse) => {
        this.logEvent(`${eventName}: `, data);
        observer.next(new MessageBroadcastResponse(data));
      });
    });
  }

  public getAllMessagesEvents(): Observable<Message> {
    const eventName = 'all-messages';

    return new Observable((observer) => {
      this.socket.on(eventName, (data: any) => {
        this.logEvent(`${eventName}: `, data);
        observer.next(data);
      });
    });
  }
}
