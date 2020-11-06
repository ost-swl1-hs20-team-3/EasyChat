import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ec-username-edit',
  templateUrl: './username-edit.component.html',
  styleUrls: ['./username-edit.component.css']
})
export class UsernameEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() modalClosed: EventEmitter<any> = new EventEmitter<any>();

  private subEditModalChild: Subscription;
  @Input() raiseEditModalChild: Observable<boolean>;

  @ViewChild('openButton') openButton;
  @ViewChild('closeButton') closeButton;

  public username = '';
  public title = 'Willkommen!';
  public description = 'Bitte geben Sie einen Benutzer ein.';
  public buttonText = 'Eintreten';
  public errorMsg = '';

  public get isValidToSend(): boolean { return this.username.trim().length > 0; }

  constructor(private userService: UserService) {
    this.username = userService.getUserName();
  }

  public ngOnInit(): void {
    this.subEditModalChild = this.raiseEditModalChild.subscribe((bool) => {
      if(bool) {
        this.openModal(bool);
      } else {
        this.openModal(bool);
      }
    });
  }

  public ngAfterViewInit(): void {
  }

  public ngOnDestroy(): void {
    this.subEditModalChild.unsubscribe();
  }

  public openModal(bool: boolean): void {
    if(!bool) {
      this.title = "Benutzernamen!";
      this.description = "Bitte geben Sie einen neuen Benutzer ein.";
      this.buttonText = "Ändern";
    }

    this.username = this.userService.getUserName();
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
