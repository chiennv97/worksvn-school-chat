import { Injectable } from '@angular/core';
import { DEVSERVER } from '../service/serve';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Event} from '../class/event';
import {PaginationService} from '../service/pagination.service';
import {st} from '@angular/core/src/render3';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  urlListEvent = DEVSERVER + 'api/schools/activeEvents';
  urlCreateEvent = DEVSERVER + 'api/schools/events';
  urlDeleteEvent = DEVSERVER + 'api/schools/events/';
  urlPutEvent = DEVSERVER + 'api/schools/events/';
  urlInterestedEmployersEvent = DEVSERVER + '/api/schools/events/';
  urlExpiredEvent = DEVSERVER + 'api/schools/expiredEvents';
  urlActiveEvent = DEVSERVER + 'api/schools/schoolCooperations/activeEvents/';
  event: Event;
  accessToken = '';
  Authorization;
  httpOptions;
  constructor(
    private http: HttpClient,
    private paginationService: PaginationService,
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
      }),
      params: new HttpParams()
        .set('sortBy', this.paginationService.sortBy)
        .set('sortType', this.paginationService.sortType)
        .set('pageIndex', this.paginationService.pageIndex)
        .set('pageSize', this.paginationService.pageSize)
    };
    return this.http.get(this.urlListEvent, this.httpOptions);
  }
  deleteEvent(token: string, url: string, id) {
    this.Authorization = 'Bearer ' + token;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization,
        'Access-Control-Allow-Origin': '*',
      }),
      params: new HttpParams()
        .set('id', id)
    };
    return this.http.delete(url , this.httpOptions);
  }
  getEventDetail(token: string, url: string, id) {
    this.Authorization = 'Bearer ' + token;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization,
        'Access-Control-Allow-Origin': '*',
      }),
      params: new HttpParams()
        .set('id', id)
    };
    return this.http.get(url , this.httpOptions);
  }
  getListEmployerEvent(id) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization,
        'Access-Control-Allow-Origin': '*',
      })
    };
    return this.http.get(this.urlInterestedEmployersEvent + id + '/interestedEmployers' , this.httpOptions);
  }
}
