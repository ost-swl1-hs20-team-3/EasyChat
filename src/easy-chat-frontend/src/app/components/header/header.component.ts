import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ec-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public userService: UserService,
    public eventService: EventService) { 
  }

  public ngOnInit(): void {

  }

  public raiseModal() {
    this.eventService.setEditModal(false);
  }

}
