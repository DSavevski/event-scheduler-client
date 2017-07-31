import {Injectable} from '@angular/core';
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {User} from "./user.model";
import {Router} from "@angular/router";

@Injectable()
export class UserService {

  isAuthenticated = Observable.create();
  user: Observable<{}>;

  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  private headersRegister = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getUser(): Observable<{}> {
    if (this.user == null) {
      this.user = this.http.get('/api/user')
        .map(response => {

          if(response.text() != '') {
            this.isAuthenticated = true;
            return response.json();
          }else{
            this.isAuthenticated = false;
          }
        })
        .catch(error => {
          this.isAuthenticated = false;
          return Observable.of(null);
        });
    }
    return this.user;
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

  public registerUser(firstName: string, lastName: string, username: string, password: string): Promise<any> {
    return this.http
      .post('/api/public/register', JSON.stringify(
        {firstName: firstName, lastName: lastName, username: username, password: password}),
        {headers: this.headersRegister})
      .toPromise()
      .then(res => {
        console.log('JSON: ', res.json());
        //this.login(res.json());
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

  getGithubFullName(username: string): Observable<string> {
    let url = 'https://api.github.com/users/' + username;
    return this.http.get(url)
      .map(response => {
        return response.json().name;
      });
  }
}
