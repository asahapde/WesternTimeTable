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

  changeAdmin(user) {
    let info = {admin:false}
    if (user.admin) {
      info = {admin:false}
      this.refresh()

    } else {
      info = {admin:true}
      this.refresh()
    }

    this.authService.toggleUserInfo(user._id, info).subscribe(
      res => {
        alert("User admin status changed!");
      },
      err => {
        alert(err);

      }
    );
    this.refresh()
  }

  changeActive(user) {
    let info = {activated:false}
    if (user.activated) {
      info = {activated:false}
      this.refresh()
    } else {
      info = {activated:true}
      this.refresh()
    }

    this.authService.toggleUserInfo(user._id, info).subscribe(
      res => {
        alert("User active status changed!");
      },
      err => {
        alert(err);

      }
    );
    this.refresh()
  }

  changeHide(review) {
    let info = {hidden:false}
    if (review.hidden) {
      info = {hidden:false}
      this.refresh()
    } else {
      info = {hidden:true}
      this.refresh()
    }

    this.authService.toggleReviewInfo(review.title, info).subscribe(
      res => {
        alert("Review hide status changed!");
      },
      err => {
        alert(err);

      }
    );
    this.refresh()
  }

  refresh() {
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

}
