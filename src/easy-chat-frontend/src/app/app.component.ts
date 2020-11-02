import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'ec-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public userService: UserService) {
    
  }
  
  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      
    }
  }


}
