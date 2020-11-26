import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.loginForm = new FormGroup(
      {
        userName: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
      }
    );
  }

  onLogin(){
    console.log(this.loginForm.value);
    const currentUser = this.userService.AuthenticateUser(this.loginForm.value);
    if(currentUser) {
    localStorage.setItem('loggedUser', currentUser.userName);
      this.alertify.success('Login successfull');
      this.router.navigate(['/']);
    } else {
      this.alertify.error('Username and password do not match');
    }
    this.loginForm.reset();
  }

  get userName() {
    return this.loginForm.get('userName') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }
}
