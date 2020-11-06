import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ec-username-edit',
  templateUrl: './username-edit.component.html',
  styleUrls: ['./username-edit.component.css']
})
export class UsernameEditComponent implements OnInit, AfterViewInit {
  @Output() modalClosed: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('openButton') openButton;
  @ViewChild('closeButton') closeButton;

  public username = '';
  public title = '';
  public description = '';
  public buttonText = '';
  public errorMsg = '';

  public get isValidToSend(): boolean { return this.username.trim().length > 0; }

  constructor(private userService: UserService) {
    this.username = userService.getUserName();
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    // Wird aufgerufen, wenn User sich das erste Mal anmeldet
    if (!this.userService.isLoggedIn()) {
      this.title = 'Willkommen!';
      this.description = 'Bitte geben Sie einen Benutzernamen ein.';
      this.buttonText = 'Eintreten';
    } else {
      this.title = 'Benutzernamen';
      this.description = 'Bitte geben Sie den neuen Benutzernamen ein.';
      this.buttonText = 'Ändern';
    }
    this.openModal();
  }

  public openModal(): void {
    this.openButton.nativeElement.click();
  }

  public closeModal(): void {
    this.closeButton.nativeElement.click();
    this.modalClosed.emit();
  }

  public saveUsername(): void {
    this.errorMsg = this.userService.setUsername(this.username);
    if (this.errorMsg.length === 0) {
      this.closeModal();
    }
  }

}
