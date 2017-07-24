import {Component, OnInit, EventEmitter} from '@angular/core';
import {NgDateRangePickerOptions} from "ng-daterangepicker";
import {EventService} from "../event.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  headersRegister = new Headers({'Content-Type': 'multipart/form-data'});
  options: NgDateRangePickerOptions;
  date: any;
  startTime: any;
  endTime: any;
  description: string;
  name: string;
  // place: string;
  eventId: number;
  picture: any;

  constructor(private eventService: EventService,
              private router: Router) {
  }

  ngOnInit() {
    this.options = {
      theme: 'cyan',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yMd',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 1
    };
  }

  onCreate(){
    this.eventService.createEvent(this.name, this.description, this.date, this.startTime, this.endTime)
      .subscribe(response => {
        this.eventId = response;

      });
  }

  onChange(event) {
    this.picture = event.srcElement.files;
  }

}

