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
  nameEditBox;
  publicEditBox;
  descriptionEditBox;

  newSchedule = {
    name: '',
    username: '',
    description: '',
    public: true,
  }

  userName;

  addSelected = false;

  editSelected = false;

  constructor(private scheduleService: ScheduleService, private courseService: CourseService, private authService: AuthService,) {
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
    this.nameEditBox = '';
    this.publicEditBox = 'true';
    this.descriptionEditBox = '';
  }

  ngOnInit(): void {
    this.scheduleService.getSchedules().subscribe(
      res => {
        this.schedules = res;
      },
      err => {
        console.log(err);

      }
    );
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

  edit(scheduleEdit) {
    if (this.nameEditBox == '') {
      alert("Add a name");
    } else if (this.descriptionEditBox == '' || this.descriptionEditBox.length > 255) {
      alert("Add valid description");
    } else if (this.subjectBox == '') {
      alert("Add a subject");
    } else if (this.courseBox == '') {
      alert("Add a course");
    } else {
      this.courseService.getSearch(`http://localhost:3000/api/open/courses/${this.subjectBox}/${this.courseBox}`).subscribe(course => {
        // Get the schedule to be editted
        let schedule: Schedule = scheduleEdit;

        let courseExits = false;
        if (schedule.courses != undefined) {
          schedule.courses.forEach(c => {
            if (c.subject == this.subjectBox && c.course == this.courseBox) {
              courseExits = true;
            }
          })
        }


        let finalData = [];

        if (courseExits) {
          // Delete the course if it exits
          schedule.courses.forEach(c => {
            if (c.course == this.courseBox && c.subject == this.subjectBox) { }
            else finalData.push(c);
          })
        }
        else {
          // Add the course if it doesnt exist
          if (schedule.courses != undefined) {
            schedule.courses.forEach(c => {
              finalData.push(c);
            })

          }
          finalData.push({ subject: this.subjectBox, course: this.courseBox });
        }

        let fullScheduleData = {
          courses: finalData,
          name: this.nameEditBox,
          description: this.descriptionEditBox,
          public: this.publicEditBox,
        };


        // Course exits
        this.scheduleService.editSchedule(scheduleEdit.name, fullScheduleData).subscribe(course => {
          alert("Course Edited!");
          this.nameEditBox = '';
          this.publicEditBox = 'true';
          this.descriptionEditBox = '';
          this.courseBox = '';
          this.subjectBox = '';
          this.refresh();
        }, error => {
          alert(error);
          this.refresh();
        });


      }, error => {

      });
    }

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
        this.publicBox = 'true';
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

  editSelect() {
    if (this.editSelected) {
      this.editSelected = false;
    } else {
      this.editSelected = true;
    }
  }

  getSchedules() {
    this.scheduleService.getSchedules().subscribe(
      res => {
        this.schedules = res;
      },
      err => {
        console.log(err);

      }
    );
  }

}
