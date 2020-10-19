import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'ec-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css']
})
export class ChatBarComponent implements OnInit {

  public message = '';

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }

  public typeMessage(message: string): void {
    this.chatService.typeMessage(message);
  }

  public sendMessage(): void {
    this.chatService.sendMessage();
    this.resetMessage();
  }

  private resetMessage(): void {
    this.message = '';
    this.chatService.typeMessage('');
  }
}
