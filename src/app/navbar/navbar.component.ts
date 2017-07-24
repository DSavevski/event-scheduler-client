import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
  user: User;
  name: string;

  constructor(private userService: UserService,
              private router: Router) {
    this.user = new User();
  }

  ngOnInit() {
    this.userService.getUser()
      .subscribe(user => {
        this.user = user as User;
        this.isAuthenticated = this.user != null;
      });
  }

  goHome() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    });
  }
}
