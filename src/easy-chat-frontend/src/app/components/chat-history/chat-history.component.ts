import { Component, OnInit } from '@angular/core';
import { MessageType } from '../../models/models';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'ec-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})
export class ChatHistoryComponent implements OnInit {
  MessageType = MessageType; // To use this Enum in the template

  constructor(public chatService: ChatService) { }

  public ngOnInit(): void {
  }
}
