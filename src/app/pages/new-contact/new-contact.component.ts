import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent {
  newContact: {
    name: string;
    address: string;
    mobile: string;
    work: string;
    home: string;
    email: string;
    twitter: string;
    instagram: string;
    github: string;
  } = {
    name: '',
    address: '',
    mobile: '',
    work: '',
    home: '',
    email: '',
    twitter: '',
    instagram: '',
    github: ''
  };

  error: string = '';

  constructor(private backend: BackendService, private router: Router) {}

  createContact() {
    this.backend
      .createContact(this.newContact)
      .then(() => {
        this.router.navigate(['/contacts']);
        this.error = '';
      })
      .catch(err => {
        this.error = 'Error adding account';
      });
  }
}
