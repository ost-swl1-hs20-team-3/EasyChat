import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatMessage, UsernameChangedMessage } from '../../models/models';

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
    const mockUsernameChangedMsg = new UsernameChangedMessage('old', 'new');
    mockUsernameChangedMsg.sender = 'TheSender';
    mockUsernameChangedMsg.timestamp = new Date().toISOString();

    component.message = mockUsernameChangedMsg;

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
