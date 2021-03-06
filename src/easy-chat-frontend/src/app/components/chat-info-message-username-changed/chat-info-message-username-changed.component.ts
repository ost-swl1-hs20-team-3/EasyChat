import { Component, Input, OnInit } from '@angular/core';
import { UsernameChangedMessage } from '../../models/models';

@Component({
  selector: 'ec-chat-info-message-username-changed',
  templateUrl: './chat-info-message-username-changed.component.html',
  styleUrls: ['./chat-info-message-username-changed.component.css']
})
export class ChatInfoMessageUsernameChangedComponent implements OnInit {

  @Input() message: UsernameChangedMessage;

  constructor() { }

  ngOnInit(): void {
  }

  public getMessageText(): string {
    return `${this.message.getContent()}`;
  }

}
