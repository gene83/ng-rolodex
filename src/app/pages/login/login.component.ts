import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private auth: AuthService, private router: Router) {}

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
    this.auth
      .login(this.formData)
      .then(() => {
        const redirectUrl = this.auth.redirectUrl;

        if (redirectUrl) {
          this.router.navigate([redirectUrl]);
          this.auth.redirectUrl = '';
        } else {
          this.router.navigate(['']);
        }
      })
      .catch(err => {
        this.router.navigate(['/login']);
      });
  }
}
