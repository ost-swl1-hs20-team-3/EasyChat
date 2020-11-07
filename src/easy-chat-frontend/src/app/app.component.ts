import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from './services/user.service';

@Component({
  selector: 'ec-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  raiseWelcomeModalParent: Subject<boolean> = new Subject<boolean>();

  constructor(private userService: UserService) {
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    if(!this.userService.isLoggedIn()) {
      this.raiseWelcomeModalParent.next(true);
    }
  }

}
