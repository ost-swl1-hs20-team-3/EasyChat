import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';
import { FocusService } from 'src/app/services/focus.service';

@Component({
  selector: 'ec-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css']
})
export class ChatBarComponent implements OnInit {

  @ViewChild('messageFocus') messageFocus;

  public message = '';
  public get isValidToSend(): boolean {
    return this.userService.isLoggedIn() && this.message.trim().length > 0;
  }

  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private focusService: FocusService
  ) {
    this.focusService.focusNow$.subscribe(
      () => {
        this.setFocus();
      });
   }

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
    this.setFocus();
  }

  private setFocus(): void {
    this.messageFocus.nativeElement.focus();
  }

}
