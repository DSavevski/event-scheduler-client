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

    //console.log(navigator.geolocation);
  }


  goingToEvent(event) {
    this.eventService.goingToEvent(event.eventId).subscribe(
      () => {
        event.totalGoings++;
        event.isGoing = true;
      }
    )
  }

    cancelEvent(event) {
      this.eventService.cancelEvent(event.eventId)
        .subscribe(() => {
          event.totalGoings--;
          event.isGoing = false;
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
