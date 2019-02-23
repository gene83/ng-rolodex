import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { SessionService } from '../../services/session.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profile: Object;
  error: string = '';

  constructor(
    private backend: BackendService,
    private session: SessionService
  ) {}

  ngOnInit() {
    const user = this.session.getSession();

    this.backend
      .getProfile(user.username)
      .then(profile => {
        this.profile = profile;
        this.error = '';
      })
      .catch(err => {
        this.error = 'Error finding profile';
      });
  }
}
