import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserRegisterComponent } from '../user/user-register/user-register/user-register.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

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
