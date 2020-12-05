import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { 
    this.emailBox = '';
    this.passwordBox = ''
  }

  emailBox: String;
  passwordBox: String;
  
  ngOnInit() {
    if (this.authService.isLoggedIn())
      this.router.navigateByUrl('/profile');
  }

  onSubmit() {
    this.authService.login({email: this.emailBox, password: this.passwordBox }).subscribe(
      res => {
        this.authService.setToken(res['token']);
        this.router.navigateByUrl('/profile');
      },
      err => {
        alert(err.error.message);
      }
    );
  }

}
