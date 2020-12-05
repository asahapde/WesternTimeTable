import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userDetails;
  constructor(private authService: AuthService, private router: Router) { 
  }

  ngOnInit() {
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  onLogout() {
    this.authService.deleteToken();
    this.router.navigate(['/login']);
    this.authService.setAdmin(false);
  }

  isAdmin() {
    return this.authService.getAdmin();
  }

}
