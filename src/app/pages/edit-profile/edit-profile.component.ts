import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  editedProfile;

  isUsernameUnavailable: boolean = true;
  error: string = '';

  constructor(private backend: BackendService, private router: Router) {}

  ngOnInit() {
    this.backend
      .getProfile()
      .then(profile => {
        this.editedProfile = profile;
        this.error = '';
      })
      .catch(err => {
        this.error = 'Error finding profile';
      });
  }

  edit() {
    this.backend
      .editProfile(this.editedProfile)
      .then(() => {
        this.router.navigate(['/profile']);
      })
      .catch(err => (this.error = 'Error updating Profile'));
  }

  checkUsernameAvailability() {
    this.backend
      .checkUsernameAvailability(this.editedProfile.username)
      .then(res => {
        if (res) {
          return (this.isUsernameUnavailable = true);
        }

        return (this.isUsernameUnavailable = false);
      });
  }
}
