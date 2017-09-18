import {Injectable} from '@angular/core';
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {User} from "./user.model";
import {Subject} from "rxjs/Subject";

@Injectable()
export class UserService {

  private apiPublicUsers = '/api/public/users/';
  private apiUsers = '/api/user/';

  isAuthenticated = Observable.create();
  user: Observable<{}>;

  private newUser: Subject<User> = new Subject<User>();
  subjectUser = this.newUser.asObservable();

  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  private headersRegister = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getUser(): Observable<{}> {
    if (this.isAuthenticated) {
      this.user = this.http.get(this.apiUsers)
        .map(response => {

          if (response.text() != '') {
            this.isAuthenticated = true;
            this.newUser.next(response.json() as User);
            return response.json();
          }
          else {
            this.isAuthenticated = false;
          }
        })
        .catch(() => {
          this.isAuthenticated = false;
          return Observable.of(null);
        });
    }
    return this.user;
  }

  public login(user: User): Observable<{}> {
    const body = `username=${user.username}&password=${user.password}`;
    const url = this.apiPublicUsers + "login";

    return this.http.post(url,
      body, {headers: this.headers})
      .map(() => {
        this.isAuthenticated = true;
        return true;
      }).catch(UserService.handleError);
  }

  public logout(): Observable<Response> {
    const url = this.apiUsers + "logout";

    this.isAuthenticated = false;
    return this.http.get(url);
  }

  public registerUser(firstName: string, lastName: string, username: string, password: string, email: string): Observable<any> {
    const url = this.apiPublicUsers + "register";

    return this.http
      .post(url, JSON.stringify(
        {firstName: firstName, lastName: lastName, username: username, password: password, email: email}),
        {headers: this.headersRegister})
      .map((msg) => {
        return msg.text();
      })
      .catch(UserService.handleError);

  }

  public checkIfUsernameExists(username: string): Observable<string> {
    const url = this.apiPublicUsers + 'exists/register?username=' + username;
    return this.http
      .get(url)
      .map(response => response.text());
  }

  public checkIfUsernameOrEmailExists(usernameOrEmail: string): Observable<string> {
    const url = this.apiPublicUsers + 'exists/forget_password?username_email=' + usernameOrEmail;
    return this.http
      .get(url)
      .map(response => response.text());
  }

  private static handleError() {
    return 'Error in API occurred';
  }

  public updateUserFirstAndLastName(firstName: string, lastName: string): Observable<{}> {
    return this.http.put('/api/user', {firstName: firstName, lastName: lastName})
      .map(user => {
        return user.json();
      });
  }

  public resetPassword(oldPassword: string, newPassword: string): Observable<string> {
    const url = this.apiUsers + 'reset_password';
    return this.http
      .post(url,
        {oldPassword: oldPassword, newPassword: newPassword})
      .map(response => {
        return response.json();
      });
  }

  public sendUsernameOrEmailToResetForgottenPassword(usernameOrEmail: string): Observable<string> {
    const url = this.apiPublicUsers + `forget_password/${usernameOrEmail}`;
    return this.http.post(url, null)
      .map(res => {
        return res.text()
      })
  }

  public resetForgottenPassword(token: string, password: string): Observable<string> {
    const url = this.apiPublicUsers + 'reset/forget_password';
    return this.http
      .post(url,
        {token: token, password: password}, {headers: this.headersRegister})
      .map(response => {
        return response.text();
      });
  }

  public getProvider(): Observable<string> {
    const url = this.apiUsers + 'provider';
    return this.http.get(url)
      .map(response => {
        return response.json().provider;
      });
  }

  public activateAccount(token: string): Observable<string> {
    let url = this.apiPublicUsers + "register/confirm?token=" + token;
    console.log(url);
    return this.http.put(url, null)
      .map(msg => {
        return msg.text();
      });
  }
}
