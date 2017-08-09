import {Component, OnInit} from '@angular/core';
import {EventService} from "../event.service";
import {Router, ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  editEvent = true;
  editImage = false;

  name: string;
  description: string;
  place: string;
  city: any;

  eventId: number;
  cities: any;
  errorMessage: string;

  constructor(private eventService: EventService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.eventService.getEvent(params.get('id')))
      .subscribe(event => {
        this.name = event.name;
        this.description = event.description;
        this.place = event.place;
        this.city = event.city;
        this.eventId = event.id;
      });

    this.eventService.getCities()
      .subscribe(cities => {
        this.cities = cities;
      });
  }

  changeEditEvent() {
    this.editEvent = true;
    this.editImage = false;
  }

  changeImageEvent() {
    this.editEvent = false;
    this.editImage = true;
  }

  onUpdate() {
    this.errorMessage = null;

    this.eventService.updateEvent(this.name, this.place, this.description, this.city.id, this.eventId)
      .subscribe(res => {
        if (res == true)
          this.errorMessage = "Changes saved!";
        else
          this.errorMessage = "Error! Changes were not saved!";
      });
  }

  finish() {
    this.router.navigate(['/events']);
  }
}
