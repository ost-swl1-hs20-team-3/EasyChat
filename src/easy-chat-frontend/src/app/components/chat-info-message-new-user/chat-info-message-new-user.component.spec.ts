import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatInfoMessageNewUserComponent } from './chat-info-message-new-user.component';

describe('ChatInfoMessageNewUserComponent', () => {
  let component: ChatInfoMessageNewUserComponent;
  let fixture: ComponentFixture<ChatInfoMessageNewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatInfoMessageNewUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatInfoMessageNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
