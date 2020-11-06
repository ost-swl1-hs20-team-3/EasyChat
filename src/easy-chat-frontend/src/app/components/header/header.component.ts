import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ec-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  private subRaiseWelcomeModal: Subscription;
  @Input() raiseWelcomeModalChild: Observable<boolean>;
  
  public raiseEditModalParent: Subject<boolean> = new Subject<boolean>();

  constructor(public userService: UserService) { 
  }

  public ngOnInit(): void {
    this.subRaiseWelcomeModal = this.raiseWelcomeModalChild.subscribe((bool) => 
      this.raiseModal(bool));
  }

  public raiseModal(bool: boolean) {
    this.raiseEditModalParent.next(bool);
  }

}
