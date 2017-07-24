import { Component, OnInit } from '@angular/core';
import {User} from "../user.model";
import {UserService} from "../user.service";
import {EventService} from "../event.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  allEvents: any;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getAllEvents()
      .subscribe(events => {
        this.allEvents = events;
      });
  }

}
