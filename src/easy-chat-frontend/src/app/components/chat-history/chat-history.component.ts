import { Component, OnInit } from '@angular/core';
import { ChatMessage, MessageType } from '../../models/models';
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

  public showUsername(message: ChatMessage, indexOfMessage: number): boolean {
    if(this.chatService.messageList.length >= 2 && indexOfMessage > 0) {
      if((message.senderName === this.chatService.messageList[indexOfMessage-1].senderName)
      && (message.getType() === this.chatService.messageList[indexOfMessage-1].getType())) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
