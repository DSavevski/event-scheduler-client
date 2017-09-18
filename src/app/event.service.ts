import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class EventService {

  private headersRegister = new Headers({'Content-Type': 'application/json'});

  private apiEventsPublic = '/api/public/events/';
  private apiEvents = '/api/events/';

  constructor(private http: Http) {
  }

  public createEvent(name: string, desc: string, start: any, end: any, place: any, cityId: number): Observable<any> {
    return this.http.post(this.apiEvents, JSON.stringify({
      name: name, description: desc, startTime: start, endTime: end, place: place, cityId: cityId
    }), {headers: this.headersRegister})
      .map((msg) => {
        return msg.text();
      });
  }

  public getUserEvents(): Observable<any> {
    return this.http.get(this.apiEvents)
      .map(events => {
        return events.json();
      });
  }

  public getAllEvents(): Observable<any> {
    return this.http.get(this.apiEventsPublic)
      .map(events => {
        return events.json();
      });
  }

  public updateEvent(name: string, place: string, description: string, cityId: number, id: number): Observable<any> {
    return this.http.put(this.apiEvents, {
      name: name, place: place, description: description,
      id: id, cityId: cityId
    })
      .map(event => {
        return event.json();
      });
  }

  public getEvent(id: string): Observable<any> {
    return this.http.get(this.apiEvents + id)
      .map(event => {
        return event.json();
      });
  }

  public goingToEvent(id: number): Observable<any> {
    const url = this.apiEvents +id + '/going';
    return this.http.get(url)
      .map(events => {
        return events.text();
      });
  }

  public cancelEvent(id: number): Observable<any> {
    const url = this.apiEvents +id + '/cancel';
    return this.http.delete(url)
      .map(result => {
        return result;
      });
  }

  public deleteEvent(id: number): Observable<any> {
    return this.http.delete(this.apiEvents + id)
      .map(result => {
        return result;
      });
  }

  public getCities(): Observable<any> {
    const url = this.apiEventsPublic +'/cities';
    return this.http.get(url)
      .map(result => {
        return result.json();
      });
  }

  public filterCities(cityName: string): Observable<any> {
    const url = this.apiEventsPublic + cityName;
    return this.http.get(url)
      .map(filteredEvents => {
        return filteredEvents.json();
      })

  }
}
