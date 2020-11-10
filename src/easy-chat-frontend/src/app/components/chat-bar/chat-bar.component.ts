import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';
import { EventService } from 'src/app/services/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ec-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css']
})
export class ChatBarComponent implements OnInit {

  focusNowSubscription: Subscription;

  @ViewChild('messageFocus') messageFocus;

  public message = '';
  public get isValidToSend(): boolean {
    return this.userService.isLoggedIn() && this.message.trim().length > 0;
  }

  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private eventService: EventService
  ) {
    this.focusNowSubscription = this.eventService.focusNow$.subscribe(
      () => {
        this.setChatbarFocus();
      });
   }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.focusNowSubscription.unsubscribe();
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
    this.setChatbarFocus();
  }

  private setChatbarFocus(): void {
    this.messageFocus.nativeElement.focus();
  }

}
