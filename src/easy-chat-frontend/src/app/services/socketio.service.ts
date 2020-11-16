import { Injectable } from '@angular/core';
import { EMPTY, merge, Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private FF_USE_SOCKET_IO: boolean = environment.FEATURE_FLAGS.USE_SOCKET_IO;
  private socket: SocketIOClient.Socket;

  constructor() {
    this.setupSocketConnection();
  }

  private setupSocketConnection(): void {
    if (!this.FF_USE_SOCKET_IO) {
      console.warn(`SOCKET.IO connecton is NOT used!`);
      return;
    }

    this.socket = io.connect(environment.SOCKET_ENDPOINT, { transports: ['websocket'] });
  }

  private emit(event: string, msg: any): void {
    if (!this.FF_USE_SOCKET_IO) { return; }

    this.socket.emit(event, msg);
  }


  public emitChatMessage(msg: any): void {
    this.emit('message', msg);
  }

  public emitLogin(username: string): void {
    this.emit('login', username);
  }

  public emitUsernameChange(oldUsername: string, newUsername: string): void {
    this.emit('username-change', { oldUsername, newUsername });
  }


  public getLoginEvents(): Observable<any> {
    if (!this.FF_USE_SOCKET_IO) { return EMPTY; }

    const eventName = 'login-broadcast';
    return new Observable((observer) => {
      this.socket.on(eventName, (data: any) => {
        console.log(`${eventName}: `, data);
        observer.next(data);
      });
    });
  }

  public getUserNameChangedEvents(): Observable<any> {
    if (!this.FF_USE_SOCKET_IO) { return EMPTY; }

    const eventName = 'username-change-broadcast';
    return new Observable((observer) => {
      this.socket.on(eventName, (data: any) => {
        console.log(`${eventName}: `, data);
        observer.next(data);
      });
    });
  }

  public getMessageEvents(): Observable<any> {
    if (!this.FF_USE_SOCKET_IO) { return EMPTY; }

    const eventName = 'message-broadcast';
    return new Observable((observer) => {
      this.socket.on(eventName, (data: any) => {
        console.log(`${eventName}: `, data);
        observer.next(data);
      });
    });
  }

  public getAllMessagesEvents(): Observable<any> {
    if (!this.FF_USE_SOCKET_IO) { return EMPTY; }

    const eventName = 'all-messages';
    return new Observable((observer) => {
      this.socket.on(eventName, (data: any) => {
        console.log(`${eventName}: `, data);
        observer.next(data);
      });
    });
  }

  public getAllEvents(): Observable<any> {
    if (!this.FF_USE_SOCKET_IO) { return EMPTY; }

    return merge(
      this.getLoginEvents(),
      this.getUserNameChangedEvents(),
      this.getMessageEvents(),
      this.getAllMessagesEvents()
    );
  }
}
