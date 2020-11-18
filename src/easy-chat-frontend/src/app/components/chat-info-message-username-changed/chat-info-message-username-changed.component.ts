import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from 'src/app/models/chat-message.model';

@Component({
  selector: 'ec-chat-info-message-username-changed',
  templateUrl: './chat-info-message-username-changed.component.html',
  styleUrls: ['./chat-info-message-username-changed.component.css']
})
export class ChatInfoMessageUsernameChangedComponent implements OnInit {

  @Input() chatMessage: ChatMessage;

  constructor() { }

  ngOnInit(): void {
  }

}
