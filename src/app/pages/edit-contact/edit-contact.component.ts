import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent {
  error: string = '';
  contactId: number;
  editedContact: Object;

  constructor(
    private backend: BackendService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));

    if (isNaN(id)) {
      return this.router.navigate(['/contacts']);
    }

    this.contactId = id;

    this.backend
      .getContact(this.contactId)
      .then(contact => {
        if (contact) {
          this.editedContact = contact;
          return (this.error = '');
        }

        return (this.error = 'Contact not found');
      })
      .catch(err => {
        this.error = 'Error finding contact';
      });
  }

  edit() {
    this.backend
      .editContact(this.editedContact)
      .then(() => {
        this.router.navigate(['/contacts']);
        this.error = '';
      })
      .catch(err => {
        this.error = 'Error deleting contact';
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
