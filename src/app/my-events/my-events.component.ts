import {Component, OnInit} from '@angular/core';
import {EventService} from "../event.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {

  events: any;

  constructor(private eventService: EventService,
              private router: Router) {
  }

  ngOnInit() {
    this.eventService.getUserEvents()
      .subscribe(events => {
        this.events = events;
      });
  }

  deleteEvent(eventId: number) {
    this.eventService.deleteEvent(eventId)
      .subscribe(result => {
        console.log('Result from delete event', result);
        this.eventService.getUserEvents()
          .subscribe(events => {
            this.events = events;
          })
      });
  }

  edit(id: number){
    this.router.navigate(['/edit-event', id]);
  }
}
