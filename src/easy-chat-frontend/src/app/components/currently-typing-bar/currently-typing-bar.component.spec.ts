import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentlyTypingBarComponent } from './currently-typing-bar.component';

describe('CurrentlyTypingBarComponent', () => {
  let component: CurrentlyTypingBarComponent;
  let fixture: ComponentFixture<CurrentlyTypingBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentlyTypingBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentlyTypingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
