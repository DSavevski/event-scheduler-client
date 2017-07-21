import {Component, OnInit} from '@angular/core';
import {User} from "../user.model";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated = false;
  user = {};

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.userService.getUser()
      .subscribe(user => {
        this.user = user;
        this.isAuthenticated = this.user != null;
      });
  }

  goHome() {
    console.log('Clicked');
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    });
  }
}
