import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SocketioService } from '../../services/socketio.service';

@Component({
  selector: 'ec-users-online-button',
  templateUrl: './users-online-button.component.html',
  styleUrls: ['./users-online-button.component.css']
})
export class UsersOnlineButtonComponent implements OnInit {


  constructor(
    private socketioService: SocketioService,
    private chatService: ChatService
  ) { }

  public ngOnInit(): void {
  }

  public isConnected(): boolean {
    return this.socketioService.isConnected();
  }

  public getNumberOfOnlineUsers(): number {
    return this.chatService.onlineUsersSorted.length;
  }

  public getOnlineUsernames(): Array<string> {
    return this.chatService.onlineUsersSorted;
  }

}
