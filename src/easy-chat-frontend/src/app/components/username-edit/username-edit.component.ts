import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ec-username-edit',
  templateUrl: './username-edit.component.html',
  styleUrls: ['./username-edit.component.css']
})
export class UsernameEditComponent implements OnInit, OnDestroy {

  @Output() modalClosed: EventEmitter<any> = new EventEmitter<any>();

  private editModalSubscription: Subscription;

  @ViewChild('openButton') openButton: ElementRef;
  @ViewChild('closeButton') closeButton: ElementRef;
  @ViewChild('usernameFocus') usernameFocus: ElementRef;

  public username = '';
  public title = 'Willkommen!';
  public description = 'Bitte geben Sie einen Benutzer ein.';
  public buttonText = 'Eintreten';
  public errorMsg = '';

  public get isValidToSend(): boolean { return this.username.trim().length > 0; }

  constructor(
    private userService: UserService,
    private eventService: EventService) {
    this.username = userService.getUserName();
    this.editModalSubscription = this.eventService.editModal$.subscribe(
      (isLogin) => {
        this.openModal(isLogin);
      });
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.editModalSubscription.unsubscribe();
  }

  public saveUsername(): void {
    this.errorMsg = this.userService.setUsername(this.username);
    if (this.errorMsg.length === 0) {
      this.closeModal();
    }
  }

  private closeModal(): void {
    this.closeButton.nativeElement.click();
    this.modalClosed.emit();
    this.eventService.setFocusNow();
  }

  private openModal(isLogin: boolean): void {
    if (!isLogin) {
      this.title = 'Benutzername';
      this.description = 'Bitte geben Sie einen neuen Benutzer ein.';
      this.buttonText = 'Ändern';
    }
    this.username = this.userService.getUserName();
    this.openButton.nativeElement.click();
    this.usernameFocus.nativeElement.focus();
    this.usernameFocus.nativeElement.setSelectionRange(0, this.username.length);
  }

}
