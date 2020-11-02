import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ec-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private viewContainerRef: ViewContainerRef,
    public userService: UserService,
    ) { }

  public ngOnInit(): void {
  }

  public changeUsername() {
    this.userService.openUserEditModal(this.viewContainerRef);
  }

}
