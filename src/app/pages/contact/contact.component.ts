import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactId: number;
  contact: Object;
  error: string = '';

  constructor(
    private backend: BackendService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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

  delete() {
    this.backend
      .deleteContact(this.contactId)
      .then(() => {
        this.router.navigate(['/contacts']);
        this.error = '';
      })
      .catch(err => {
        this.error = 'Contact could not be deleted';
      });
  }
}
