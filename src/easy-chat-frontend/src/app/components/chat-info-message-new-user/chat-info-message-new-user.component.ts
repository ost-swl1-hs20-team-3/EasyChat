import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from 'src/app/models/chat-message.model';

@Component({
  selector: 'ec-chat-info-message-new-user',
  templateUrl: './chat-info-message-new-user.component.html',
  styleUrls: ['./chat-info-message-new-user.component.css']
})
export class ChatInfoMessageNewUserComponent implements OnInit {

  @Input() chatMessage: ChatMessage;

  constructor() {
  }

  ngOnInit(): void {
  }

}
