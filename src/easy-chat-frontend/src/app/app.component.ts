import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EventService } from './services/event.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'ec-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(
    private userService: UserService,
    private eventService: EventService) {
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.eventService.setblurNow(true);
      this.eventService.setEditModal(true);
    }
  }

}
