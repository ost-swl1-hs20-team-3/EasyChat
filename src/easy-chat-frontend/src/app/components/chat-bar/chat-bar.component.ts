import { Component, ElementRef, OnDestroy, OnInit, ViewChild, forwardRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';
import { EventService } from 'src/app/services/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ec-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css']
})
export class ChatBarComponent implements OnInit, OnDestroy {

  private maxRows = 4;

  private focusNowSubscription: Subscription;

  @ViewChild('focusTextarea') focusTextarea: ElementRef;

  public message = '';
  public get showTextArea(): boolean { return this.rows > 1; }
  public get rows(): number {
    const requiredRows = ((this.message || '').match(/\n/g) || []).length + 1;
    return requiredRows > this.maxRows ? this.maxRows : requiredRows;
  }
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
  
  public preventEnter(event): void {
    if (event.keyCode == 13 && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private setChatbarFocus(): void {
    this.focusTextarea.nativeElement.focus();
  }
}
