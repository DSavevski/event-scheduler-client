import {Component, OnInit} from '@angular/core';

import {UserService} from "../user.service";
import {EventService} from "../event.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  allEvents: any;
  loggedUser: any;
  cities: any;

  chosenCity: string;

  constructor(private eventService: EventService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.eventService.getAllEvents()
      .subscribe(events => {
        this.allEvents = events;
      });

    this.eventService.getCities()
      .subscribe(cities => {
        this.cities = cities;
      });

    this.userService.getUser().subscribe(user => {
      this.loggedUser = user;
    });

    console.log(navigator.geolocation);
  }


  goingToEvent(id: number) {
    this.eventService.goingToEvent(id).subscribe(
      msg => {
        this.eventService.getAllEvents()
          .subscribe(events => {
            this.allEvents = events;
          });
      }
    )
  }

  canGo(event: any): boolean {
    if (this.loggedUser != null) {
      for (var i = 0; i < event.attendingUsers.length; i++) {
        if (event.attendingUsers[i].id === this.loggedUser.id) {
          return true;
        }
      }
    }
    return false;
  }

  cancelEvent(eventId: number) {
    this.eventService.cancelEvent(eventId)
      .subscribe(result => {
        this.eventService.getAllEvents()
          .subscribe(events => {
            this.allEvents = events;
          });
      });
  }

  filter(){
      this.eventService.filterCities(this.chosenCity)
        .subscribe(filteredEvents => {
          this.allEvents = filteredEvents;
        });
  }

  getAllEvents(){
    this.eventService.getAllEvents()
      .subscribe(events => {
        this.allEvents = events;
      });
  }
}
