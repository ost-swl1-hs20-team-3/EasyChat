import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'ec-currently-typing-bar',
  templateUrl: './currently-typing-bar.component.html',
  styleUrls: ['./currently-typing-bar.component.css']
})
export class CurrentlyTypingBarComponent implements OnInit {

  public typingMessage: string;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.currentMessage.subscribe((message) => {
      message = message.trim()
      this.typingMessage = (message.length > 0) ? message + '...' : '';
    });
  }

}
