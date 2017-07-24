import { Component, OnInit } from '@angular/core';
import {EventService} from "../event.service";

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {

  events: any;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getUserEvents()
      .subscribe(events => {
        this.events = events;
      });
  }

}
