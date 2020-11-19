import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatMessage } from '../../models/chat-message.model';

import { ChatInfoMessageNewUserComponent } from './chat-info-message-new-user.component';

describe('ChatInfoMessageNewUserComponent', () => {
  let component: ChatInfoMessageNewUserComponent;
  let fixture: ComponentFixture<ChatInfoMessageNewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatInfoMessageNewUserComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatInfoMessageNewUserComponent);
    component = fixture.componentInstance;
  });

  it('should create with correct input', () => {
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
