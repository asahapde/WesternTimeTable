import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetails;
  passwordSelected = false;
  passwordBox;
  confirmBox;

  constructor(private authService: AuthService, private router: Router) {
    this.userDetails = {}
    this.passwordBox = '';
    this.confirmBox = '';
    
  }

  ngOnInit() {
    this.authService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {
        console.log(err);

      }
    );
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  onLogout() {
    this.authService.deleteToken();
    this.router.navigate(['/login']);
  }

  changePassword() {
    if (this.passwordBox.length < 4) {
      alert("Enter a valid password.")
    } else if (this.passwordBox != this.confirmBox) {
      alert("Confirm password mismatch");
    } else {
      this.authService.changePassword({password: this.passwordBox}).subscribe(course => {
        alert("Password changed!");
        this.passwordBox = '';
        this.confirmBox = '';
      }, err => {
        alert(err);
      });
    }
  }

  passwordSelect() {
    if (this.passwordSelected) {
      this.passwordSelected = false;
    } else {
      this.passwordSelected = true;
    }
  }
  

}
