import { Component, OnInit } from '@angular/core';

import { ScheduleService } from '../schedule.service';
import { CourseService } from '../course.service';
import { AuthService } from '../auth.service';
import { Schedule } from '../Schedule';
import { Course } from '../Course';

@Component({
  selector: 'app-private-schedules',
  templateUrl: './private-schedules.component.html',
  styleUrls: ['./private-schedules.component.css']
})
export class PrivateSchedulesComponent implements OnInit {

  schedules: Schedule[];
  selectedSchedule;
  courseDetail;
  courses: Course[];
  tableHeader = ['Section', 'Component', 'Class Nbr', 'Days', 'Start Time', 'End Time', 'Location', 'Instructor', 'Requisites and Constraints', 'Status', 'Campus'];


  nameBox;
  publicBox;
  descriptionBox;
  courseBox;
  subjectBox;

  newSchedule = {
    name: '',
    username: '',
    description: '',
    public: true,
  }

  userName;

  addSelected = false;

  constructor(private scheduleService: ScheduleService, private courseService: CourseService, private authService: AuthService) {
    this.scheduleService.getSchedules().subscribe(
      res => {
        this.schedules = res;
      },
      err => {
        console.log(err);

      }
    );
    this.authService.getUserProfile().subscribe(
      res => {
        this.userName = res['user'].username;
      },
      err => {
        console.log(err);
        return '';
      }
    );
    this.nameBox = '';
    this.publicBox = 'true';
    this.descriptionBox = '';
    this.courseBox = '';
    this.subjectBox = '';
  }

  ngOnInit(): void {
  }

  getCourses(schedule: Schedule) {
    for (let i = 0; i < schedule.courses.length; i++) {
      this.courseService.getSearch(`http://localhost:3000/api/open/courses/${schedule.courses[i].subject}/${schedule.courses[i].course}`).subscribe(course => {
        for (let c of course) {
          this.courses.push(c);
        }
      }, error => {
        this.courses = [];
      });
    }

  }

  onSelect(schedule: Schedule): void {
    if (this.selectedSchedule != schedule) {
      this.selectedSchedule = schedule;
      this.courses = [];
      this.getCourses(schedule);
    } else if (this.selectedSchedule == schedule) {
      this.selectedSchedule = '';
    }

  }

  edit() {

  }

  delete(scheduleName) {
    this.scheduleService.deleteSchedule(scheduleName).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);

      }
    );
    this.refresh();
  }

  refresh() {
    this.scheduleService.getSchedules().subscribe(
      res => {
        this.schedules = res;
      },
      err => {
        console.log(err);

      }
    );
  }

  add() {
    if (this.nameBox == '' || this.nameBox.length > 10) {
      alert("Enter a valid name");
    } else {
      this.newSchedule.name = this.nameBox.replace(/<[^>]*>/g, '');
      this.newSchedule.username = this.userName;
      this.newSchedule.public = (this.publicBox === "true");
      this.newSchedule.description = this.descriptionBox;


      this.scheduleService.createSchedule(this.newSchedule).subscribe(course => {
        alert("Course Added!");
        this.nameBox = '';
        this.publicBox = '';
        this.descriptionBox = '';
        this.courseBox = '';
        this.subjectBox = '';
        this.refresh();
      }, err => {
        alert(err);
      });
    }



  }

  addSelect() {
    if (this.addSelected) {
      this.addSelected = false;
    } else {
      this.addSelected = true;
    }
  }

}
