import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';

import { registerAsync, loginAsync, logoutAsync } from '../services/webApi.js'

import { AlertifyService } from 'src/app/services/alertify.service';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private router: Router,
    private alertify: AlertifyService) {}

  async register(user: User) {
    try {
      const result = await registerAsync(user.email, user.password, user.userName, user.mobile);
      this.validateResult(result);

      this.alertify.success('You have succesfully registered');
      this.router.navigate(['/user/login']);

    } catch (err) {
      console.error(err);
    }
  }

  async login(email, password) {
    try {
      const result = await loginAsync(email, password);
      this.validateResult(result);

      localStorage.setItem('userId', result.objectId);
      localStorage.setItem('userName', result.userName);
      localStorage.setItem('userToken', result['user-token']);

      this.alertify.success('Login successfull');
      this.router.navigate(['/']);

    } catch (err) {
      console.error(err);
      this.alertify.error('Email and password do not match');
    }
  }

  async logout() {
    try {
        const result = await logoutAsync();
        this.validateResult(result);

        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userToken');

        this.router.navigate(['/']);
      } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

  validateResult(result) {
    if (result.hasOwnProperty('errorData')) {
      const error = new Error();
      Object.assign(error, result);
      throw error;
    }
  }


  addUser(user: User) {
    let users = [];
    if (localStorage.getItem('Users')) {
      users = JSON.parse(localStorage.getItem('Users'));
      users = [...users, user];
    } else {
      users = [user];
    }
    localStorage.setItem('Users', JSON.stringify(users));
  }

  AuthenticateUser(user: any) {
    let userArray = [];
    if (localStorage.getItem('Users')) {
      userArray = JSON.parse(localStorage.getItem('Users'));
    }
    return userArray.find((x) =>
    x.userName === user.userName &&
    x.password === user.password);
  }
}
