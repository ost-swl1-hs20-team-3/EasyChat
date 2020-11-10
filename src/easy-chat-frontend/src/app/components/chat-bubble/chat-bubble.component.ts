import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../../models/chat-message.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ec-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.css']
})
export class ChatBubbleComponent implements OnInit {

  @Input() chatMessage: ChatMessage;

  constructor(private userService: UserService) { }

  public ngOnInit(): void {
  }

  public isSentByMe(): boolean {
    return (this.chatMessage.sender === this.userService.getUserName()) ? true : false;
  }

}
