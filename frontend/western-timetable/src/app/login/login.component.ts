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
    this.passwordBox = '';
  }

  emailBox: String;
  passwordBox: String;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ngOnInit() {
    if (this.authService.isLoggedIn())
      this.router.navigateByUrl('/profile');
  }

  onSubmit() {
    if (!this.emailBox.match(this.emailRegex)) {
      alert("Enter a Valid Email");
    } else if (this.passwordBox == '') {
      alert("Enter a Password");
    } else {
      this.authService.login({ email: this.emailBox, password: this.passwordBox }).subscribe(
        res => {
          this.authService.setToken(res['token']);
          this.authService.setAdmin(res['admin']);
          this.router.navigateByUrl('/profile');
        },
        err => {
          alert(err.error.message);
        }
      );
    }


  }

  onGoogle() {

    window.open('/api/open/google', "mywindow", "location=1,status=1,scrollbars=1, width=800,height=800");
    window.addEventListener('message', (message) => {
      this.authService.setToken(message.data.token);
      this.authService.setAdmin(message.data.admin);
      this.router.navigateByUrl('/profile');
      
    });


  }

}
