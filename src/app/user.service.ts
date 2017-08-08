import {Injectable} from '@angular/core';
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {User} from "./user.model";
import {Subject} from "rxjs/Subject";

@Injectable()
export class UserService {

  isAuthenticated = Observable.create();
  user: Observable<{}>;

  private newUser: Subject<User> = new Subject<User>();
  subjectUser = this.newUser.asObservable();

  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  private headersRegister = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getUser(): Observable<{}> {
    if (this.isAuthenticated) {
      this.user = this.http.get('/api/user')
        .map(response => {

          if(response.text() != '') {
            this.isAuthenticated = true;
            this.newUser.next(response.json() as User);
            return response.json();
          }else{
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

  public checkUser(): Observable<boolean>{

  return this.http.get('/api/user/check')
      .map(res => {
      return res.json();
      });
}

  public login(user: User): Observable<{}> {
    let body = `username=${user.username}&password=${user.password}`;

    return this.http.post('/api/public/login',
      body, {headers: this.headers})
      .map(() => {
      this.getUser();
      this.isAuthenticated = true;
        return true;
      }).catch(UserService.handleError);

  }

  public logout(): Observable<Response> {
    this.isAuthenticated = false;
    return this.http.get('/api/logout');
  }

  public registerUser(firstName: string, lastName: string, username: string, password: string): Observable<any> {
    return this.http
      .post('/api/public/register', JSON.stringify(
        {firstName: firstName, lastName: lastName, username: username, password: password}),
        {headers: this.headersRegister})
        .map((msg) => {
          return msg.text();
        })
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

  public updateUserFirstAndLastName(firstName: string, lastName: string): Observable<{}>{

    console.log('Firstname', firstName);
    return this.http.put('/api/user', {firstName: firstName, lastName: lastName})
      .map(user => {
        return user.json();
      });
  }

  public resetPassword(oldPassword: string, newPassword: string): Observable<string>{
    return this.http
      .post('/api/user/reset',
       {oldPassword: oldPassword, newPassword : newPassword})
      .map(response => {
        return response.json();
      });
  }

  public getProvider() : Observable<string> {
    return this.http.get('/api/user/provider')
      .map(response => {
        return response.json().provider;
      });
  }
}
