import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class EventService {

  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  private headersRegister = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  public createEvent (name: string, desc: string, date: any, start:any, end: any): Observable<any> {
    return this.http.post('/api/event', JSON.stringify({name: name, description: desc,
    date: date, startTime: start, endTime: end}), {headers: this.headersRegister})
      .map((msg) => {
        return msg.text();
      });
    // return null;
  }

  public getUserEvents(): Observable<any>{
    return this.http.get('/api/event')
      .map(events => {
        return events.json();
      });
  }

  public getAllEvents(): Observable<any>{
    return this.http.get('/api/public/events')
      .map(events => {
        return events.json();
      });
  }

}
