import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {UserService} from "./user.service";

@Injectable()
export class UserGuardService implements CanActivate {

  constructor(private userService: UserService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.isLoggedIn) {
      return true;
    }
    else {
      this.router.navigate(['/login'])
        .then(message => {
          console.log('Message from UserGuardService', message);
        });
      return false;
    }
  }
}
