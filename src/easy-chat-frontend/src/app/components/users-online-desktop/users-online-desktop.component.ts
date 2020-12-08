import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'ec-users-online-desktop',
  templateUrl: './users-online-desktop.component.html',
  styleUrls: ['./users-online-desktop.component.css']
})
export class UsersOnlineDesktopComponent implements OnInit {

  constructor(
    private socketioService: SocketioService,
    private chatService: ChatService) { }

  ngOnInit(): void {
  }
  
  public isConnected(): boolean {
    return this.socketioService.isConnected();
  }

  public getNumberOfOnlineUsers(): number {
    return this.chatService.onlineUserNames.length;
  }

  public getOnlineUsernames(): Array<string> {
    return this.chatService.onlineUserNames;
  }

}
