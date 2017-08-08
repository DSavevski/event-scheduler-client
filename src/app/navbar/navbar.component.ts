import {Component, OnInit} from '@angular/core';
import {User} from "../user.model";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

import {Http} from "@angular/http";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated = false;
  user: User;
  checkUser: boolean;
  provider: string;


  constructor(public userService: UserService,
              private router: Router,
              private http: Http) {
    this.user = new User();
  }

  ngOnInit() {
    this.userService.getUser()
      .subscribe(user => {
        this.user = user as User;
        this.isAuthenticated = user != null;
        this.userService.checkUser()
            .subscribe(res => {
              this.checkUser= res;
            });
      });

    this.userService.subjectUser
      .subscribe(res => {
          this.user = res;
          this.isAuthenticated = true;
          this.userService.getProvider()
            .subscribe(provider => this.provider = provider);
      });


  }

  goHome() {
    this.userService.logout().subscribe(() => {
      this.isAuthenticated = false;
      this.user = null;
      this.router.navigate(['']);
      this.userService.checkUser()
          .subscribe(res => {
            this.checkUser = res;
          });
    });
  }
}
