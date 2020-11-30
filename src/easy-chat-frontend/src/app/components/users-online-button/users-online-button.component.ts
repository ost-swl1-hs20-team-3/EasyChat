import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketioService } from 'src/app/services/socketio.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'ec-users-online-button',
  templateUrl: './users-online-button.component.html',
  styleUrls: ['./users-online-button.component.css']
})
export class UsersOnlineButtonComponent implements OnInit, OnDestroy {

  private reservedUsernamesSubscription = new Subscription();

  public onlineUsernames: string[] = [];

  constructor(
    private socketioService: SocketioService
  ) {
    this.reservedUsernamesSubscription = this.socketioService.getReservedUsernames().subscribe((msg) => {
      this.onlineUsernames = msg.getReservedUsernames();
    });
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.reservedUsernamesSubscription.unsubscribe();
  }

  public isConnected(): boolean {
    return this.socketioService.isConnected();
  }

}
