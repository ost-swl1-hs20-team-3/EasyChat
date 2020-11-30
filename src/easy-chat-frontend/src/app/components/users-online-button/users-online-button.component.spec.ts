import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersOnlineButtonComponent } from './users-online-button.component';

describe('UsersOnlineButtonComponent', () => {
  let component: UsersOnlineButtonComponent;
  let fixture: ComponentFixture<UsersOnlineButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersOnlineButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersOnlineButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
