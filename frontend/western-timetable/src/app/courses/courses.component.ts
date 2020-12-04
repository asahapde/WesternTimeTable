import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

import { Course } from '../Course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  selectedOption: string;
  courseBox: string;
  subjectBox: string;
  keywordBox: string;
  courses: Course[];
  results: Number = 0;
  selectedCourse: Course;

  tableHeader = ['Section', 'Component', 'Class Nbr', 'Days', 'Start Time', 'End Time', 'Location', 'Instructor', 'Requisites and Constraints', 'Status', 'Campus'];

  constructor(private courseService: CourseService) {
    this.selectedOption = '';
    this.courseBox = '';
    this.subjectBox = '';
    this.keywordBox = '';
  }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.courseBox == '' && this.subjectBox != '' && this.selectedOption == '') {
      this.courseService.getSearch(`http://localhost:3000/api/open/courses/${this.subjectBox}`).subscribe(course => {
        this.courses = course;
        this.results = this.courses.length;
      }, error => {
        this.courses = [];
        this.results = this.courses.length;
      });
    }
    else if (this.courseBox != '' && this.subjectBox != '' && this.selectedOption != '') {
      this.courseService.getSearch(`http://localhost:3000/api/open/courses/${this.subjectBox}/${this.courseBox}/${this.selectedOption}`).subscribe(course => {
        this.courses = course;
        this.results = this.courses.length;
      }, error => {
        this.courses = [];
        this.results = this.courses.length;
      });
    }
    else if (this.courseBox != '' && this.subjectBox != '' && this.selectedOption == '') {
      this.courseService.getSearch(`http://localhost:3000/api/open/courses/${this.subjectBox}/${this.courseBox}`).subscribe(course => {
        this.courses = course;
        this.results = this.courses.length;
      }, error => {
        this.courses = [];
        this.results = this.courses.length;
      });
    }
  }

  viewAllCourses(): void {
    this.selectedOption = '';
    this.courseBox = '';
    this.subjectBox = '';
    this.courseService.getCourses().subscribe(course => {
      this.courses = course;
      this.results = this.courses.length;
    });
  }

  search(): void {
    this.courseService.getKeyword(`http://localhost:3000/api/open/keywords/${this.keywordBox}`).subscribe(course => {
      
      this.courses = course;
      this.results = this.courses.length;
    }, error => {
      this.courses = [];
      this.results = this.courses.length;
    });
  }

  onSelect(course: Course) : void {
    this.selectedCourse = course
  }

}
