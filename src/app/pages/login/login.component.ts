import { Component } from '@angular/core';

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

  constructor() {}
}
