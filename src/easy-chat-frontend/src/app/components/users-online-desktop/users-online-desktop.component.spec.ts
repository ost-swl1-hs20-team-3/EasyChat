import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersOnlineDesktopComponent } from './users-online-desktop.component';

describe('UsersOnlineDesktopComponent', () => {
  let component: UsersOnlineDesktopComponent;
  let fixture: ComponentFixture<UsersOnlineDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersOnlineDesktopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersOnlineDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
