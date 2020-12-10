import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private router: Router){ }

  loggedInUser: string;

  ngOnInit() {
  }

  isLoggedIn() {
    this.loggedInUser = localStorage.getItem('userName');
    return this.loggedInUser;
  }

  onLogout(){
    this.userService.logout().then(()=>{
    this.alertify.success('Logout successful');
    this.router.navigate(['/']);
    });
  }
}
