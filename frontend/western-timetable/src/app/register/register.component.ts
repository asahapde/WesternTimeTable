import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import {Router} from '@angular/router'

import { User } from '../User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  emailBox: String;
  passwordBox: String;
  nameBox: String;
  userNameBox: String;
  user: User;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private authService: AuthService, private router: Router) {
    this.emailBox = '';
    this.passwordBox = '';
    this.userNameBox = '';
    this.nameBox = '';
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.emailBox.match(this.emailRegex)) {
      alert("Enter a Valid Email");
    } else if (this.passwordBox.length <= 4) {
      alert("Password must be atleast 4 characters long");
    } else if (this.nameBox == '') {
      alert("Name must not be empty");
    } else if (this.userNameBox == '') {
      alert("User name must not be empty");
    } else {
      this.user = {
        name: this.nameBox,
        email: this.emailBox,
        password: this.passwordBox,
        username: this.userNameBox,
        admin: false,
        verified: false,
        activated: true
      }
      this.authService.postUser(this.user).subscribe(
        res => {
          alert("User Registered. Check your email for verification details.");
          this.emailBox = '';
          this.passwordBox = '';
          this.userNameBox = '';
          this.nameBox = '';
          this.router.navigateByUrl('/login');
        },
        err => {
          console.log(err);
          alert(err.message);
          this.emailBox = '';
          this.passwordBox = '';
          this.userNameBox = '';
          this.nameBox = '';
        }
      );
    }


  }

}
