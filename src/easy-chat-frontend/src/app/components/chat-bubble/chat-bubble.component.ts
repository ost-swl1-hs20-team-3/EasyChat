import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../../models/chat-message.model';

@Component({
  selector: 'ec-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.css']
})
export class ChatBubbleComponent implements OnInit {

  @Input() chatMessage: ChatMessage;

  constructor() { }

  ngOnInit(): void {
  }

  public isSentByMe(): boolean {
   return (this.chatMessage.sender === 'ICH') ?  true :  false;
  }

}
