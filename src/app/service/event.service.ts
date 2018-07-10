import { Injectable } from '@angular/core';
import { DEVSERVER } from '../service/serve';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Event} from '../class/event';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  urlListEvent = DEVSERVER + 'api/schools/activeEvents';
  urlCreateEvent = DEVSERVER + 'api/schools/events';
  urlDeleteEvent = DEVSERVER + 'api/schools/events/';
  urlPutEvent = DEVSERVER + 'api/schools/events/';
  urlInterestedEmployersEvent = DEVSERVER + '/api/schools/events/{id}/interestedEmployers';
  urlExpiredEvent = DEVSERVER + 'api/schools/expiredEvents';
  urlActiveEvent = DEVSERVER + 'api/schools/schoolCooperations/activeEvents/';
  event: Event;
  accessToken = '';
  Authorization;
  httpOptions;
  constructor(
    private http: HttpClient,
  ) {
    this.accessToken = localStorage.getItem('accessToken');
    // console.log(this.accessToken);
    this.Authorization = 'Bearer ' + this.accessToken;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization,
        'Access-Control-Allow-Origin': '*',
      })
    };
  }
  createNewEvent(token: string, event: Event) {
    this.Authorization = 'Bearer ' + token;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization,
        'Access-Control-Allow-Origin': '*',
      })
    };
    return this.http.post(this.urlCreateEvent, this.event, this.httpOptions);
  }
  getEvent(token: string) {
    this.Authorization = 'Bearer ' + token;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization,
        'Access-Control-Allow-Origin': '*',
      })
    };
    return this.http.get(this.urlListEvent, this.httpOptions);
  }
}
