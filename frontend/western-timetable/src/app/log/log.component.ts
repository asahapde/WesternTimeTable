import { Component, OnInit } from '@angular/core';
import { Log } from '../Log';
import { LogService } from '../log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  titleBox;
  typeBox;
  dateRecieveBox;
  dateSentBox;

  addSelected = false;

  logsData: Log[];

  constructor(private logService: LogService) {
    this.titleBox = '';
    this.typeBox = '';
    this.dateRecieveBox = '';
    this.dateSentBox = '';
  }

  ngOnInit(): void {
    this.logService.getLogs().subscribe(
      res => {
        this.logsData = res['log'];
      },
      err => {
        console.log(err);

      }
    );
  }

  addLog() {
    if (this.titleBox == '') {
      alert("Enter a title!");
    } else if (this.typeBox == '') {
      alert("Enter a type!");
    } else if (this.dateRecieveBox == '') {
      alert("Enter date recieved!");
    } else if (this.dateSentBox == '') {
      alert("Enter date sent!");
    } else {
      let data = {
        title: this.titleBox,
        type: this.typeBox,
        dateRecieved: this.dateRecieveBox,
        dateSent: this.dateSentBox
      }

      this.logService.createLog(data).subscribe(
        res => {
          alert("Log Saved!");
          this.refresh();
        },
        err => {
          alert(err);
          this.refresh();

        }
      );
      this.refresh();
    }

  }

  addSelect() {
    if (this.addSelected) this.addSelected = false;
    else this.addSelected = true;
  }


  refresh() {
    this.logService.getLogs().subscribe(
      res => {
        this.logsData = res['log'];
      },
      err => {
        console.log(err);

      }
    );
    this.titleBox = '';
    this.typeBox = '';
    this.dateRecieveBox = '';
    this.dateSentBox = '';
  }

}
