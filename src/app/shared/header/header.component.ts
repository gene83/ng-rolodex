import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: Object;

  constructor(
    private router: Router,
    private auth: AuthService,
    private session: SessionService
  ) {
    this.user = this.session.getSession();
  }

  isLoggedIn() {
    return this.session.isLoggedIn;
  }

  logout() {
    return this.auth
      .logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(err => {
        this.router.navigate(['/']);
      });
  }
}
