import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

import { AuthService } from '../services/auth.service';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService,
    private session: SessionService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const loggedIn = this.session.isLoggedIn();

      if (loggedIn) {
        return resolve(true);
      }

      this.auth.redirectUrl = url;
      this.router.navigate(['/login']);
      return resolve(false);
    });
  }
}
