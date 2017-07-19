import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  firstName:string;
  lastName:string;
  username:string;
  password:string;

  constructor(private userService: UserService,
              private router:Router) { }

  ngOnInit() {
  }

  onCreate(){
    this.userService.registerUser(this.firstName,this.lastName,this.username,this.password)
  }

  checkForDuplicateUserName(){

  }
  /*getUser(){
    this.userService.getUser().then(response => {
      this.test = response;
    });
    console.log(this.test);
  }*/


}
