import { Injectable, inject } from '@angular/core';
import { BackendService } from './backend.service';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string;

  constructor(
    private backend: BackendService,
    private session: SessionService,
    private router: Router
  ) {}

  login(user) {
    return this.backend.login(user).then(res => {
      return this.session.setSession(res);
    });
  }

  register(user) {
    return this.backend.register(user);
  }
}
