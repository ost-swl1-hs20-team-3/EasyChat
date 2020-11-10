import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ec-username-edit',
  templateUrl: './username-edit.component.html',
  styleUrls: ['./username-edit.component.css']
})
export class UsernameEditComponent implements OnInit {

  @Output() modalClosed: EventEmitter<any> = new EventEmitter<any>();

  editModalSubscription: Subscription;

  @ViewChild('openButton') openButton;
  @ViewChild('closeButton') closeButton;
  @ViewChild('usernameFocus') usernameFocus;

  public username = '';
  public title = 'Willkommen!';
  public description = 'Bitte geben Sie einen Benutzer ein.';
  public buttonText = 'Eintreten';
  public errorMsg = '';

  public get isValidToSend(): boolean { return this.username.trim().length > 0; }

  constructor(
    private userService: UserService,
    private eventService: EventService) {
    console.log("constructor aufgerufen");
    this.username = userService.getUserName();
    this.editModalSubscription = this.eventService.editModal$.subscribe(
      (bool) => {
        this.openModal(bool);
      });
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.editModalSubscription.unsubscribe();
  }


  public openModal(bool: boolean): void {
    if (!bool) {
      this.title = "Benutzername";
      this.description = "Bitte geben Sie einen neuen Benutzer ein.";
      this.buttonText = "Ändern";
    }
    this.username = this.userService.getUserName();
    this.openButton.nativeElement.click();
    this.usernameFocus.nativeElement.focus();
    this.usernameFocus.nativeElement.setSelectionRange(0, this.username.length);
  }

  public closeModal(): void {
    this.closeButton.nativeElement.click();
    this.modalClosed.emit();
    this.eventService.setFocusNow();
  }

  public saveUsername(): void {
    this.errorMsg = this.userService.setUsername(this.username);
    if (this.errorMsg.length === 0) {
      this.closeModal();
    }
  }

}
