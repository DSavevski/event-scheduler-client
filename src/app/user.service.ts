import {Injectable} from '@angular/core';
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {User} from "./user.model";

@Injectable()
export class UserService {

  isLoggedIn: boolean = false;
  loggedUser: Observable<{}>;
  // subject: Subject<any> = new Subject();
  // subjectObservable = this.subject.asObservable();
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  private headersRegister = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getUser(): Observable<{}> {
    if (this.loggedUser == null) {
      this.loggedUser = this.http.get('/api/user')
        .map(response => {
          this.isLoggedIn = true;
          return response.json();
        })
        .catch(error => {
          console.log('Error from getUser() in user-service', error);
          this.isLoggedIn = false;
          return Observable.of(null);
        });
    }
    return this.loggedUser;
  }

  public login(user: User): Observable<string> {
    console.log('This user will be sent to backend: ', user);
    let body = `username=${user.username}&password=${user.password}`;

    return this.http.post('/api/public/login',
      body, {headers: this.headers})
      .map(response => {
        console.log('From service, login ok!', response);
        // redirect
        return 'Ok';
      }).catch(UserService.handleError);
  }

  public logout(): Observable<Response> {
    console.log('In logout');
    return this.http.get('/api/logout');
  }

  public registerUser(firstName: string, lastName: string, username: string, password: string): Promise<any> {
    return this.http
      .post('/api/public/register', JSON.stringify(
        {firstName: firstName, lastName: lastName, username: username, password: password}),
        {headers: this.headersRegister})
      .toPromise()
      .then(res => res.json())
      .catch(UserService.handleError);

  }

  public checkForDuplicateUsername(username: string): Observable<string> {
    return this.http
      .get(`/api/public/duplicate/${username}`)
      .map(response => response.json());
  }

  private static handleError() {
    return 'Error in API occurred';
  }
}
