import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserConnectedMessage } from '../../models/models';

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
    const mockUserConnectedMsg = new UserConnectedMessage('TheSender');
    mockUserConnectedMsg.senderName = 'TheSender';
    mockUserConnectedMsg.timestamp = new Date().toISOString();

    component.message = mockUserConnectedMsg;

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
