import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../user.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;
  message: string;

  constructor(private userService: UserService) {
    this.user = new User();
  }

  ngOnInit() {
    this.userService.getUser()
      .subscribe(user => {
        this.user = user as User;
      });
  }

  onSave(){
    this.message = null;
    this.userService.updateUserFirstAndLastName(this.user.firstName, this.user.lastName)
      .subscribe(user => {
        this.user = user as User;
        this.message = "Changes saved!";
      });
  }

}
