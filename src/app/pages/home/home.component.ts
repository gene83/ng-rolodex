import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchTerm: string = '';
  contacts: Object = [];

  constructor(private backend: BackendService) {}

  searchDb() {
    this.backend.search(searchTerm).then(contacts => {
      this.contacts = contacts;
    });
  }
}
