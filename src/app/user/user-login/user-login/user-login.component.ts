import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor() { }

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
    this.loginForm.reset();

  }

  get userName() {
    return this.loginForm.get('userName') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }
}
