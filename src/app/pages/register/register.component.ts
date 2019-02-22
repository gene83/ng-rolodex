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
  isNameInvalid: boolean = false;
  isEmailInvalid: boolean = false;
  isAddressInvalid: boolean = false;

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

  validateName() {
    const { name } = this.formData;
    if (name.length > 16) {
      this.isNameInvalid = true;
    } else if (name.match(/\W/)) {
      this.isNameInvalid = true;
    } else {
      this.isNameInvalid = false;
    }
  }

  validateEmail() {
    const { email } = this.formData;

    if (email.length < 5 && email.length !== 0) {
      this.isEmailInvalid = true;
    } else if (email.length > 30) {
      this.isEmailInvalid = true;
    } else if (!email.includes('@')) {
      this.isEmailInvalid = true;
    } else if (!email.includes('.')) {
      this.isEmailInvalid = true;
    } else {
      this.isEmailInvalid = false;
    }
  }

  validateAddress() {
    const { address } = this.formData;

    if (address.length < 3 && address.length !== 0) {
      this.isAddressInvalid = true;
    } else if (address.length > 30) {
      this.isAddressInvalid = true;
    } else {
      this.isAddressInvalid = false;
    }
  }

  register() {
    const user = this.formData;

    this.auth.register(user).then(() => {
      this.router.navigate(['/login']).catch(err => {
        this.router.navigate(['/register']);
      });
    });
  }
}
