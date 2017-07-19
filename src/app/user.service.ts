import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  public registerUser(firstName: string, lastName: string, username: string, password: string): Promise<any> {
    return this.http
      .post('/api/public/register', JSON.stringify(
        {firstName: firstName, lastName: lastName, username: username, password: password}),
        {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.onError);

  }

  public checkForDuplicateUsername(username: string) : Promise<string> {
    const url = '/api/public/duplicate/' +  username;
    return this.http
      .get(url).toPromise()
      .then(response => response.json())
      .catch(this.onError);
  }

  public getUser(): Promise<any> {
    return this.http.get('/api/getUser').toPromise()
      .then(response => response.json())
      .catch(this.onError);
  }


  private toJson = res => res.json() || {};

  private onError(error: Response | any) {
    return Observable.throw(error);
  }
}
