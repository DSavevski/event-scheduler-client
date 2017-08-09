import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import "rxjs/add/operator/distinctUntilChanged";
import 'rxjs/add/observable/of';
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {User} from "../user.model";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  user: User;
  private searchTerms = new Subject<string>();
  tmp = "test";

  confirmPassword: string;
  message: string;
  userId: number;

  constructor(private userService: UserService,
              private router: Router) {
    this.user = new User();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        ? this.userService.checkForDuplicateUsername(term) // return the http search observable
        : Observable.of<string>()).subscribe(val => { // or the observable of empty heroes if there was no search term
      this.tmp = val;
    });
  }

  onCreate() {
    this.message = null;
    if (this.confirmPassword === this.user.password) {
      this.userService.registerUser(this.user.firstName, this.user.lastName, this.user.username, this.user.password, this.user.email)
          .subscribe(response => {
            this.userId = response;
            console.log(this.userId);
      });
    } else {
      this.message = "Your passwords do not match!";
      this.user.password = null;
      this.confirmPassword = null;
    }
  }

  checkIfUsernameExists() {
    return this.tmp !== 'test' && !this.tmp['username'];
  }

  finish() {
    this.router.navigate(['/login']);
  }
}
