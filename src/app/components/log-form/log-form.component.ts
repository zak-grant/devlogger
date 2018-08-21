import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';
import { Log } from '../../models/Log';


@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id: string;
  text: string;
  date: any;
  isNew: boolean = true;

  constructor(private logService: LogService) { }

  ngOnInit() {
    //Subscribe to the selectedLog Observable
    this.logService.selectedLog.subscribe(log => {
      if (log.id !== null) {
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    });
  }

  onSubmit() {
    //check if new log
    if (this.isNew) {
      //Create a new log
      const newLog = {
        id: this.generateId(),
        text: this.text,
        date: new Date()
      }
      this.logService.addLog(newLog);

    } else {
      // update log
      const updLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      }
      //update log
      this.logService.updateLog(updLog);

    }

    // //Clear the state
    this.clearState();
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  clearState() {
    this.isNew = true;
    this.id = '';
    this.text = '';
    this.date = '';
    this.logService.clearState();
  }

}
