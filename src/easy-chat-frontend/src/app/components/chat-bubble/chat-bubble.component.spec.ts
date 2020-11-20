import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatMessage } from '../../models/models';

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
    const mockChatMsg = new ChatMessage('InfoContent');
    mockChatMsg.sender = 'TheSender';
    mockChatMsg.timestamp = new Date().toISOString();

    component.chatMessage = mockChatMsg;

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
