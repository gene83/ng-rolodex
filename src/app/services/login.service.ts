import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(data) {
    const headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    const reqOptions = {
      headers: new HttpHeaders(headerDict)
    };

    return this.http.post('http://localhost:8080/api/login', data).toPromise();
  }
}
