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

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loginForm = new FormGroup(
      {
        email: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
      }
    );
  }

  onLogin(){
    this.userService.login(this.loginForm.value.email, this.loginForm.value.password);
    this.loginForm.reset();
  }

  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }
}
