import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private http: HttpClient) {}

  login(user) {
    return this.http.post('/api/login', user).toPromise();
  }

  logout() {
    return this.http.post('/api/logout', null).toPromise();
  }

  register(user) {
    return this.http.post('/api/register', user).toPromise();
  }

  search(term) {
    return this.http.get(`/api/contacts/search/${term}`).toPromise();
  }

  getAllContacts() {
    return this.http.get('/api/contacts').toPromise();
  }

  getContact(id) {
    return this.http.get(`/api/contacts/${id}`).toPromise();
  }

  deleteContact(id) {
    return this.http.delete(`/api/contacts/${id}`).toPromise();
  }

  editContact(editedContact) {
    return this.http
      .put(`/api/contacts/${editedContact.id}`, editedContact)
      .toPromise();
  }

  createContact(contact) {
    return this.http.post('/api/contacts', contact).toPromise();
  }

  getProfile() {
    return this.http.get('/api/profile').toPromise();
  }
}
