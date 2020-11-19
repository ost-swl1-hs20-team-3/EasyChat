import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatMessage } from '../../models/chat-message.model';

import { ChatBubbleComponent } from './chat-bubble.component';

describe('ChatBubbleComponent', () => {
  let component: ChatBubbleComponent;
  let fixture: ComponentFixture<ChatBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatBubbleComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatBubbleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const infoMsg = new ChatMessage();
    infoMsg.content = 'InfoContent';
    infoMsg.sender = 'TheSender';
    infoMsg.timestamp = new Date().toISOString();
    infoMsg.type = 'usernameChanged';

    component.chatMessage = infoMsg;

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
