import { Injectable } from '@angular/core';
import { User } from './User';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  adminUser = false;
  constructor(private http: HttpClient) { }

  //HttpMethods

  postUser(user: User) {
    return this.http.post('http://localhost:3000/api/open/register', user);
  }

  login(authCredentials) {
    return this.http.post('http://localhost:3000/api/open/login', authCredentials);
  }

  googleLogin() {
    return this.http.get('http://localhost:3000/api/open/google/');
  }

  getUserProfile() {
    const header = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken()
    });
    return this.http.get('http://localhost:3000/api/secure/profile', { headers: header });
  }

  changePassword(password) {
    const header = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken()
    });
    return this.http.post('http://localhost:3000/api/secure/updatepassword', password, { headers: header });
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

  setAdmin(isAdmin){
    localStorage.setItem('admin', isAdmin);
  }

  getAdmin() {
    if(localStorage.getItem('admin') == 'true'){
      return true;
    }
    return false;
  }

  getAllUsers() {
    const header = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken()
    });
    return this.http.get('http://localhost:3000/api/admin/getUsers', { headers: header });
  }

  toggleUserInfo(id, info) {
    const header = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken()
    });
    return this.http.put(`http://localhost:3000/api/admin/editUser/${id}`, info, { headers: header });
  }

  toggleReviewInfo(title, info) {
    const header = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken()
    });
    return this.http.put(`http://localhost:3000/api/admin/reviews/${title}`, info, { headers: header });
  }


}
