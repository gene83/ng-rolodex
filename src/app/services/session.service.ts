import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  user: {
    loggedIn: boolean;
    username: string;
  } = {
    loggedIn: false,
    username: ''
  };

  constructor() {
    let userString = window.localStorage.getItem('user');

    try {
      if (userString) {
        this.user = JSON.parse(userString);
      } else {
        this.user.loggedIn = false;
        this.user.username = '';
      }
    } catch (err) {
      this.user.loggedIn = false;
      this.user.username = '';
      window.localStorage.removeItem('user');
    }
  }

  getSession() {
    return this.user;
  }

  setSession(user) {
    this.user.username = user.username;
    this.user.loggedIn = true;

    let userString = JSON.stringify(this.user);
    window.localStorage.setItem('user', userString);
  }

  clearSession() {
    this.user.username = '';
    this.user.loggedIn = false;

    window.localStorage.removeItem('user');
  }

  isLoggedIn() {
    return this.user.loggedIn;
  }
}
