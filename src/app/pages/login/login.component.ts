import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formData: {
    username: string;
    password: string;
  } = {
    username: '',
    password: ''
  };

  isUsernameInvalid: boolean = true;
  isPasswordInvalid: boolean = true;

  constructor(private backend: LoginService) {}

  validateUsername() {
    const { username } = this.formData;

    if (!username) {
      this.isUsernameInvalid = true;
    } else if (username.length < 3) {
      this.isUsernameInvalid = true;
    } else if (username.length > 16) {
      this.isUsernameInvalid = true;
    } else if (username.match(/\W/)) {
      this.isUsernameInvalid = true;
    } else {
      this.isUsernameInvalid = false;
    }
  }

  validatePassword() {
    const { password } = this.formData;

    if (!password) {
      this.isPasswordInvalid = true;
      // } else if (password.length < 3) {
      // this.isPasswordInvalid = true;
    } else if (password.length > 16) {
      this.isPasswordInvalid = true;
    } else if (password.match(/\W/)) {
      this.isPasswordInvalid = true;
    } else {
      this.isPasswordInvalid = false;
    }
  }

  login() {
    this.backend
      .login(this.formData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
