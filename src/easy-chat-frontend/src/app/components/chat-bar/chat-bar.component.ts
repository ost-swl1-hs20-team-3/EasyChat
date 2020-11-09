import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'ec-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css']
})
export class ChatBarComponent implements OnInit {

  public message = '';
  public get isValidToSend(): boolean {
    return this.userService.isLoggedIn() && this.message.trim().length > 0;
  }

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) { }

  public ngOnInit(): void {
  }

  public typeMessage(): void {
    this.chatService.typeMessage(this.message);
  }

  public sendMessage(): void {
    if (this.isValidToSend) {
      this.chatService.sendMessage(this.message);
      this.resetMessage();
    }
  }

  private resetMessage(): void {
    this.message = '';
    this.chatService.typeMessage('');
  }

}
