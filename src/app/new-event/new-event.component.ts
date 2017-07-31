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
  options: NgDateRangePickerOptions;
  date: any;
  startTime: any;
  endTime: any;
  description: string;
  name: string;
  eventId: number;
  picture: any;
  place: any;
  cities: any;
  chosenCity: any;

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

    this.eventService.getCities()
      .subscribe(cities => {
        this.cities = cities;
      });
  }

  onCreate() {
    this.eventService.createEvent(this.name, this.description, this.date, this.startTime,
      this.endTime, this.place, this.chosenCity.id)
      .subscribe(response => {
        this.eventId = response;
      });
  }

  finish() {
    this.router.navigate(['/events']);
  }

}

