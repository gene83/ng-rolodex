import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contact: Object;
  error: string = '';

  constructor(private backend: BackendService) {}

  ngOnInit() {
    this.backend
      .getContact(id)
      .then(contact => {
        this.contact = contact;
        this.error = '';
      })
      .catch(err => {
        this.error = 'Contact not Found';
      });
  }
}
