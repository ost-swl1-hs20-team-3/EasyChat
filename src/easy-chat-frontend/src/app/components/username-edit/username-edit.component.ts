import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ec-username-edit',
  templateUrl: './username-edit.component.html',
  styleUrls: ['./username-edit.component.css']
})
export class UsernameEditComponent implements OnInit {
  
  public username: string = '';
  public get isValidToSend(): boolean { return this.username.trim().length > 0 };
  

  constructor(private userService: UserService) {
    this.username = userService.getUserName();
  }

  public ngOnInit(): void {
    
  }
  
  public get hasUserName(): boolean {
    return this.userService.isLoggedIn();
  }

  public get titleText(): string {
    return 'Benutzername';
  }

  public get descriptionText(): string {
    return 'desc';
  }

  public saveUsername() {
    this.userService.setUsername(this.username);
  }

}
