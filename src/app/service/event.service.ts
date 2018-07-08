import { Injectable } from '@angular/core';
import { DEVSERVER } from '../service/serve';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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
  constructor(
    private http: HttpClient,
  ) { }


}
