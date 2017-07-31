import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class EventService {

  // private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  private headersRegister = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  public createEvent(name: string, desc: string, date: any, start: any, end: any, place: any, cityId: number): Observable<any> {
    return this.http.post('/api/event', JSON.stringify({
      name: name, description: desc,
      date: date, startTime: start, endTime: end, place: place, cityId: cityId
    }), {headers: this.headersRegister})
      .map((msg) => {
        return msg.text();
      });
  }

  public getUserEvents(): Observable<any> {
    return this.http.get('/api/event')
      .map(events => {
        return events.json();
      });
  }

  public getAllEvents(): Observable<any> {
    return this.http.get('/api/public/events')
      .map(events => {
        return events.json();
      });
  }

  public updateEvent(name: string, place: string, description: string, cityId: number, id: number): Observable<any> {
    let url = '/api/event';
    console.log('id: ', id);
    return this.http.put(url, {
      name: name, place: place, description: description,
      id: id, cityId: cityId
    })
      .map(event => {
        return event.json();
      });
  }

  public getEvent(id: string): Observable<any> {
    let url = '/api/event/' + id;
    return this.http.get(url)
      .map(event => {
        return event.json();
      });
  }

  public goingToEvent(id: number): Observable<any> {
    let url = '/api/event/going/' + id;
    console.log(url);
    return this.http.get(url)
      .map(events => {
        return events.text();
      });
  }

  public cancelEvent(id: number): Observable<any> {
    let url = '/api/event/cancel/' + id;
    return this.http.delete(url)
      .map(result => {
        console.log('Result from delete request for canceling event', result);
        return result;
      });
  }

  public deleteEvent(id: number): Observable<any> {
    console.log("delete event with id : " + id);
    return this.http.delete('/api/event/' + id)
      .map(result => {
        console.log('Result from delete request for deleting event', result);
        return result;
      });
  }

  public getCities(): Observable<any> {
    return this.http.get('/api/public/cities')
      .map(result => {
        return result.json();
      });
  }

  public filterCities(cityName: string): Observable<any> {
    let url = '/api/public/filter/' + cityName;
    return this.http.get(url)
      .map(filteredEvents => {
        return filteredEvents.json();
      })

  }
}
