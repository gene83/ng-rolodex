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
}
