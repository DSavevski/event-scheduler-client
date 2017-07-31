import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {UserService} from "./user.service";

@Injectable()
export class UserGuardService implements CanActivate {

  constructor(private userService: UserService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {


    //this.userService.getUser();
    console.log('User form guard: ', this.userService.isAuthenticated);
    if (this.userService.isAuthenticated == true) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
