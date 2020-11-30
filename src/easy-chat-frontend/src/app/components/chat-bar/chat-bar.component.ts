import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'ec-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css']
})
export class ChatBarComponent implements OnInit, OnDestroy {

  private focusNowSubscription: Subscription;

  @ViewChild('focusTextarea') focusTextarea: ElementRef;

  public message = '';
  public get isValidToSend(): boolean {
    return this.userService.isLoggedIn() && !this.isMessageBlank;
  }
  private get isMessageBlank(): boolean {
    return /^\s*$/.test(this.message);
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

  public sendMessage(): void {
    if (this.isValidToSend) {
      this.chatService.sendMessage(this.message);
      this.resetMessage();
    }
  }

  private resetMessage(): void {
    this.message = '';
    this.setChatbarFocus();
  }

  public preventEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private setChatbarFocus(): void {
    this.focusTextarea.nativeElement.focus();
  }
}
