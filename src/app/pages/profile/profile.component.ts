import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profile: Object;
  error: string = '';

  constructor(private backend: BackendService) {}

  ngOnInit() {
    this.backend
      .getProfile()
      .then(profile => {
        this.profile = profile;
        this.error = '';
      })
      .catch(err => {
        this.error = 'Error finding profile';
      });
  }
}
