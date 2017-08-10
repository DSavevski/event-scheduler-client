import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {UserService} from "../user.service";

@Component({
  selector: 'app-reset-forgotten-password',
  templateUrl: './reset-forgotten-password.component.html',
  styleUrls: ['./reset-forgotten-password.component.css']
})
export class ResetForgottenPasswordComponent implements OnInit {

  token: string;
  password: string;
  confirmPassword: string;
  message: string;

  constructor(private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    this.route.queryParamMap
      .switchMap((params: ParamMap) => this.token = params.get('token')).subscribe();
  }

  onSubmit() {
    this.message = undefined;
    if (this.password != '' && this.confirmPassword != '') {
      if (this.password === this.confirmPassword) {
        this.userService.resetForgottenPassword(this.token, this.confirmPassword)
          .subscribe(response => {
            if (response == 'true') {
              this.message = "Password reset successfully!";
            } else if (response == 'false') {
              this.message = "Invalid or expired token!";
            }
          })
      }
      else {
        this.message = "Your new password does not match!";
      }
    } else {
      this.message = "Password fields can not be blank!";
    }
  }

}
