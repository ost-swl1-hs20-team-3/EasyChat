import { DatePipe } from '@angular/common';
import { Input, PipeTransform } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../../models/models';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ec-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.css'],
  providers: [DatePipe]
})
export class ChatBubbleComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  @Input() showUsername: boolean;

  public get timestamp(): string { return new DateTransformer(this.datePipe).transform(this.chatMessage.timestamp); }

  constructor(private userService: UserService, private datePipe: DatePipe) { }

  public ngOnInit(): void {
  }

  public isSentByMe(): boolean {
    return this.userService.isMySocketId(this.chatMessage.senderSocketId);
  }

}

class DateTransformer implements PipeTransform {

  constructor(private datePipe: DatePipe) { }

  public transform(isoString: string, ...args: any[]): string {
    const currentDate: Date = new Date(Date.parse(isoString));
    const day = this.getDay(currentDate);
    const time = this.datePipe.transform(isoString, 'HH:mm');
    return `${day}, ${time} Uhr`;
  }

  private getDay(currentDate: Date): string {
    if (this.isToday(currentDate)) {
      return 'Heute';
    } else if (this.isYesterday(currentDate)) {
      return 'Gestern';
    } else {
      return this.datePipe.transform(currentDate.toISOString(), 'dd.MM.yyyy');
    }
  }

  private isToday(currentDate: Date): boolean {
    const today: Date = new Date();
    return today.toDateString() === currentDate.toDateString();
  }

  private isYesterday(currentDate: Date): boolean {
    const dateToCompare: Date = new Date();
    dateToCompare.setDate(dateToCompare.getDate() - 1);
    return dateToCompare.toDateString() === currentDate.toDateString();
  }

}
