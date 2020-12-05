import { Injectable } from '@angular/core';
import { User } from './User';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  selectedUser: User = {
    name: '',
    username: '',
    email: '',
    password: '',
    admin: false,
    activated: false,
    verified: false,
  };

  apiBaseUrl: 'http://localhost:3000/api';

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HttpMethods

  postUser(user: User) {
    return this.http.post(this.apiBaseUrl + '/open/register', user, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post('http://localhost:3000/api/open/login', authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(this.apiBaseUrl + '/secure/profile');
  }


  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
