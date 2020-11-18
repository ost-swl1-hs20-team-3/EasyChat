import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatInfoMessageUsernameChangedComponent } from './chat-info-message-username-changed.component';

describe('ChatInfoMessageUsernameChangedComponent', () => {
  let component: ChatInfoMessageUsernameChangedComponent;
  let fixture: ComponentFixture<ChatInfoMessageUsernameChangedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatInfoMessageUsernameChangedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatInfoMessageUsernameChangedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
