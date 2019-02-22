import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formData: {
    username: string;
    password: string;
    name: string;
    email: string;
    address: string;
  } = {
    username: '',
    password: '',
    name: '',
    email: '',
    address: ''
  };

  isUsernameInvalid: boolean = true;
  isPasswordInvalid: boolean = true;
  isNameInvalid: boolean = true;
  isEmailInvalid: boolean = true;
  isAddressInvalid: boolean = true;

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
    } else if (password.length < 3) {
      this.isPasswordInvalid = true;
    } else if (password.length > 16) {
      this.isPasswordInvalid = true;
    } else if (password.match(/\W/)) {
      this.isPasswordInvalid = true;
    } else {
      this.isPasswordInvalid = false;
    }
  }

  registerUser() {
    const user = this.formData;

    this.auth.registerUser(user).then(() => {
      this.router.navigate(['/login']).catch(err => {
        this.router.navigate(['/register']);
      });
    });
  }
}
