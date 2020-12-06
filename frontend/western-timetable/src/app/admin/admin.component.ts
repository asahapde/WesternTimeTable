import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { AuthService } from '../auth.service';
import { ReviewService } from '../review.service';
import { Review } from '../Review';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[];
  reviews: Review[];

  constructor(private authService: AuthService, private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe(
      res => {
        
        this.users = res['user'];
      },
      err => {
        console.log(err);

      }
    );
    this.reviewService.getAllReviews().subscribe(
      res => {
        this.reviews = res;
      },
      err => {
        console.log(err);

      }
    );
  }

  changeAdmin(){

  }

  changeActive(){

  }

}
