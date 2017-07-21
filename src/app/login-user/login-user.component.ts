import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../user.model";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import 'rxjs/add/operator/map';
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  user: User;
  messages: string;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user = new User();
  }

  onSubmit(): void {
    this.userService
      .login(this.user)
      .subscribe(isLoggedIn => {
        if (isLoggedIn == "Ok") {
            window.location.reload();
            this.router.navigate(['/']).then(msg => {
                console.log('Msg from login component');
            });
        }
        else
          this.messages = 'Incorrect username or password!';
      });
  }
}
