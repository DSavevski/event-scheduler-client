import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {UserService} from "../user.service";
import {noUndefined} from "@angular/compiler/src/util";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  private searchTerms = new Subject<string>();
  usernameOrEmail:string;
  response;
  message: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.searchTerms
      .debounceTime(1000)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        ? this.userService.checkIfUsernameOrEmailExists(term) // return the http search observable
        : Observable.of<string>()).subscribe(val => { // or the observable of empty heroes if there was no search term
        this.response = val;
    });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  onSubmit(): void{
    this.message = undefined;
    if(this.usernameOrEmail != ''){
      this.userService.sendUsernameOrEmailToResetForgottenPassword(this.usernameOrEmail)
        .subscribe(res => {
          if(res == 'true'){
            this.message = 'Success! Check your email!';
          }
          else{
            this.message = 'Email was not sent, something went wrong!';
          }
      });
    }

  }
}
