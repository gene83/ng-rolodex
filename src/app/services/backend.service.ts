import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private http: HttpClient) {}

  login(user) {
    return this.http.post('/api/login', user).toPromise();
  }

  register(user) {
    return this.http.post('/api/register', user).toPromise();
  }
}
