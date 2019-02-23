import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent {
  contacts: Array<Object> = [];
  error: string = '';

  constructor(private backend: BackendService) {}

  ngOnInit() {
    this.backend
      .getAllContacts()
      .then((contacts: Array<Object>) => {
        this.contacts = contacts;
        this.error = '';
      })
      .catch(err => {
        this.error = 'Error fetching contacts';
      });
  }
}
