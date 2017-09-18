import {Component, OnInit} from '@angular/core';
import {EventService} from "../event.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  name: string;
  description: string;
  startTime: any;
  endTime: any;
  place: any;
  cities: any;
  chosenCity: any;
  eventId: number;
  message: string;

  constructor(private eventService: EventService,
              private router: Router) {
  }

  ngOnInit() {
    this.eventService.getCities()
      .subscribe(cities => {
        this.cities = cities;
      });
  }

  onCreate() {
    this.message = null;
    if (this.startTime != null
      && this.endTime != null && this.chosenCity != null && this.name != null && this.description != null
      && this.place != null) {

      this.eventService.createEvent(this.name, this.description,this.startTime,
        this.endTime, this.place, this.chosenCity.id)
        .subscribe(response => {
          this.eventId = response;
        });
    } else {
      this.message = "Please fill out all the fields!";
    }
  }

  finish() {
    this.router.navigate(['/events'])
      .then();
  }

}

