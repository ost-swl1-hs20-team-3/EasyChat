import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'ec-users-online-button',
  templateUrl: './users-online-button.component.html',
  styleUrls: ['./users-online-button.component.css']
})
export class UsersOnlineButtonComponent implements OnInit {

  private onlineUsersSubscription = new Subscription();

  public noOfOnlineUsers = 0;

  constructor(private socketioService: SocketioService) {
    this.onlineUsersSubscription = socketioService.getOnlineUsers().subscribe((msg) => {
      this.noOfOnlineUsers = msg.getNumberOfOnlineUsers();
    });
  }

  ngOnInit(): void {
  }

  public isConnected(): boolean {
    return this.socketioService.isConnected();
  }

}
