import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchTerm: string = '';
  contacts: Array<Object> = [];
  noContactsFound: boolean = false;

  constructor(private backend: BackendService) {}

  searchDb() {
    if (this.searchTerm.length === 0) {
      return (this.contacts = []);
    }

    this.backend
      .search(this.searchTerm)
      .then((contacts: Array<Object>) => {
        this.contacts = contacts;
      })
      .then(() => {
        if (this.contacts.length === 0 && this.searchTerm.length !== 0) {
          this.noContactsFound = true;
        } else {
          this.noContactsFound = false;
        }
      })
      .catch(err => {
        this.contacts = [];
      });
  }
}
