import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.css']
})
export class AccountActivationComponent implements OnInit {

  token:string;
  message: string

  success:boolean;
  danger: boolean;

  constructor(private userService: UserService,
              private route: ActivatedRoute) {
    this.success = false;
    this.danger = false;
  }

  ngOnInit() {
    this.route.queryParamMap
      .switchMap((params: ParamMap) => this.token = params.get('token')).subscribe();
  }

  onActivate(){
    this.userService.activateAccount(this.token)
      .subscribe(msg => {
        this.message = msg;

        if(msg === "Invalid token")
          this.danger = true;
        else
          this.success = true;
      })
  }

}
