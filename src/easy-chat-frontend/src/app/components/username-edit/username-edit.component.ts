import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ec-username-edit',
  templateUrl: './username-edit.component.html',
  styleUrls: ['./username-edit.component.css']
})
export class UsernameEditComponent implements OnInit {
  @ViewChild('openButton') openButton;
  @ViewChild('closeButton') closeButton;

  public username: string = '';
  public get isValidToSend(): boolean { return this.username.trim().length > 0 };

  public get hasUserName(): boolean {
    return this.userService.isLoggedIn();
  }

  public get titleText(): string {
    return 'Benutzername';
  }

  public get buttonText(): string {
    return 'Eintreten';
  }

  public get descriptionText(): string {
    return 'desc';
  }

  constructor(private userService: UserService) {
    this.username = userService.getUserName();
  }

  public ngOnInit(): void {
  }

  public openModal(): void {
    this.openButton.nativeElement.click();
  }

  public closeModal(): void {
    this.closeButton.nativeElement.click();
  }

  public saveUsername(): void {
    this.userService.setUsername(this.username);
    this.closeModal();
  }

}
