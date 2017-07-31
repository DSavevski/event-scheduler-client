import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from "../user.model";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated = false;
  user: User;

  constructor(public userService: UserService,
              private router: Router) {
    this.user = new User();
  }

  ngOnInit() {
    this.userService.getUser()
      .subscribe(user => {
        this.user = user as User;
        this.isAuthenticated = user != null;
      });
    this.userService.user.subscribe(user => {
      this.user = user as User;
      this.isAuthenticated = user != null;
    });
  }

  goHome() {
    this.userService.logout().subscribe(() => {
      this.isAuthenticated = false;
      this.user = null;
      this.router.navigate(['/login']);
    });
  }

}
