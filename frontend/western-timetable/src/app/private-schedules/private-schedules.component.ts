import { Component, OnInit } from '@angular/core';

import { ScheduleService } from '../schedule.service';
import { CourseService } from '../course.service';
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

  constructor(private scheduleService: ScheduleService, private courseService: CourseService) {
    this.scheduleService.getSchedules().subscribe(
      res => {
        this.schedules = res;
      },
      err => {
        console.log(err);

      }
    );
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

}
