import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactId: number;
  contact: Object;
  error: string = '';

  constructor(private backend: BackendService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.contactId = +this.route.snapshot.paramMap.get('id');

    this.backend
      .getContact(this.contactId)
      .then(contact => {
        if (contact) {
          this.contact = contact;
          return (this.error = '');
        }

        return (this.error = 'Contact not found');
      })
      .catch(err => {
        this.error = 'Error fetching Contact';
      });
  }
}
