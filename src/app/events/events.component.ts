import { Component, OnInit } from '@angular/core';
import {User} from "../user.model";
import {UserService} from "../user.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  user:User;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
