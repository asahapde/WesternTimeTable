import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import { ReviewService } from '../review.service'
import { CourseService } from '../course.service'
import { Course } from '../Course'
import { timeStamp } from 'console';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetails;
  passwordSelected = false;
  reviewSelected = false
  passwordBox;
  confirmBox;

  courses;
  courseIds;

  titleBox;
  courseIdBox;
  reviewBox;

  constructor(private authService: AuthService, private router: Router, private reviewService: ReviewService, private courseService: CourseService) {
    this.userDetails = {}
    this.passwordBox = '';
    this.confirmBox = '';
    this.titleBox = '';
    this.courseIdBox = '';
    this.reviewBox = '';
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
    this.courseService.getCourses().subscribe(course => {
      this.courses = course;

      this.courses.filter();
    });
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

  addReview() {
    if(this.titleBox == ''){
      alert("Enter a title");
    } else if (this.courseIdBox == '') {
      alert("Enter a course Id");
    } else if (this.reviewBox == "") {
      alert("Enter a review");
    } else {
      let data = {
        username: this.userDetails.username,
        title: this.titleBox,
        courseId: this.courseIdBox,
        review: this.reviewBox
      }


      this.reviewService.createReview(data).subscribe(
        res => {
          alert("Review added!");
        },
        err => {
          alert(err);
  
        }
      );
    }
  }

  passwordSelect() {
    if (this.passwordSelected) {
      this.passwordSelected = false;
    } else {
      this.passwordSelected = true;
    }
  }
  
  reviewSelect() {
    if (this.reviewSelected) {
      this.reviewSelected = false;
    } else {
      this.reviewSelected = true;
    }
  }

}
