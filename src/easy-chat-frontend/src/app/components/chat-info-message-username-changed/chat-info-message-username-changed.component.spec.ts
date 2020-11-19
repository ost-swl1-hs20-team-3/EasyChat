import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatMessage } from '../../models/chat-message.model';

import { ChatInfoMessageUsernameChangedComponent } from './chat-info-message-username-changed.component';

describe('ChatInfoMessageUsernameChangedComponent', () => {
  let component: ChatInfoMessageUsernameChangedComponent;
  let fixture: ComponentFixture<ChatInfoMessageUsernameChangedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatInfoMessageUsernameChangedComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatInfoMessageUsernameChangedComponent);
    component = fixture.componentInstance;
  });

  it('should create with correct input', () => {
    const mockInfoMsg = new ChatMessage();
    mockInfoMsg.content = 'InfoContent';
    mockInfoMsg.sender = 'TheSender';
    mockInfoMsg.timestamp = new Date().toISOString();
    mockInfoMsg.type = 'usernameChanged';

    component.chatMessage = mockInfoMsg;

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
