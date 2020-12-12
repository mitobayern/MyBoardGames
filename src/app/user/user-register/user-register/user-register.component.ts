import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  registrationForm: FormGroup;
  userSubmitted: boolean;
  user: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertify: AlertifyService) {}

  ngOnInit() {
    this.registrationForm = new FormGroup(
      {
        userName: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl(null, [Validators.required]),
        mobile: new FormControl(null, [
          Validators.required,
          Validators.maxLength(10),
        ]),
      },
      this.passwordMatchingValidatior
    );
  }

  passwordMatchingValidatior(formGroup: FormGroup): Validators {
    return formGroup.get('password').value ===
      formGroup.get('confirmPassword').value
      ? null
      : { notmatched: true };
  }

  onSubmit() {
    this.userSubmitted = true;

    if (this.registrationForm.valid) {
      this.userService.register(this.userData());
      this.registrationForm.reset();
      this.userSubmitted = false;

    } else {
      this.alertify.error('Please provide the required fields');
    }
  }

  userData(): User {
    return (this.user = {
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value,
    });
  }

  get userName() {
    return this.registrationForm.get('userName') as FormControl;
  }
  get email() {
    return this.registrationForm.get('email') as FormControl;
  }
  get password() {
    return this.registrationForm.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }
  get mobile() {
    return this.registrationForm.get('mobile') as FormControl;
  }
}
