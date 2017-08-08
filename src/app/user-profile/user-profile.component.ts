import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;
  gi: boolean;  // general info
  rp: boolean;  // reset password
  cp: boolean;  // change picture

  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;

  successrp: string;  //success response message
  errorrp: string;

  constructor(private router: Router, private userService: UserService) {
    this.user = new User();
    this.gi = true;
    this.rp = false;
    this.cp = false;

    this.oldPassword = '';


  }

  ngOnInit() {
    this.userService.getUser()
      .subscribe(user => {
        this.user = user as User;
      });
  }

  onSave() {
    this.successrp = null;

    this.userService.updateUserFirstAndLastName(this.user.firstName, this.user.lastName)
      .subscribe(user => {
        this.user = user as User;
        this.successrp = "Changes saved!";
      });
  }

  onReset() {
    if (this.newPassword !== this.confirmNewPassword) {
      this.errorrp = "New password does not match!";
      this.successrp = null;
    }
    else if (this.oldPassword === '') {
      this.errorrp = "You must enter your previous password!";
      this.successrp = null;
    }
    else {
      this.userService.resetPassword(this.oldPassword, this.newPassword)
        .subscribe(msg => {
          if (msg['message'] == null) {
            this.errorrp = null;
            this.successrp = "Password was reset successfully!";
          }
          else {
            this.errorrp = msg['message'];
            this.successrp = null;
          }

          this.oldPassword = '';
          this.newPassword = '';
          this.confirmNewPassword = '';
        });
    }
  }

  goToGI() {
    this.gi = true;
    this.rp = false;
    this.cp = false;

    this.errorrp = '';
    this.successrp = '';
  }

  goToRP() {
    this.gi = false;
    this.rp = true;
    this.cp = false;

    this.errorrp = '';
    this.successrp = '';
  }

  goToCP() {
    this.cp = true;
    this.gi = false;
    this.rp = false;

    this.errorrp = '';
    this.successrp = '';
  }

  finish() {
    this.router.navigate(['/'])
      .then(msg => console.log('Message from callback in user-profile: ', msg));
  }
}
