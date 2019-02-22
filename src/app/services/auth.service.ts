import { Injectable, inject } from '@angular/core';
import { BackendService } from './backend.service';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private backend: BackendService,
    private session: SessionService,
    private router: Router
  ) {}

  login(user) {
    return this.backend.login(user).then(res => {
      this.session.setSession(res);
      return this.router.navigate(['']);
    });
  }
}
