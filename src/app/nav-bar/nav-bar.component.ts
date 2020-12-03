import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private userService: UserService,
    private alertify: AlertifyService) { }
  loggedInUser: string;

  ngOnInit() {
  }

  isLoggedIn() {
    this.loggedInUser = localStorage.getItem('userName');
    return this.loggedInUser;
  }

  onLogout(){
    this.userService.logout();
    this.alertify.success('Logout successful');
  }

}
