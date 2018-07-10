import {Injectable} from '@angular/core';
import {DEVSERVER} from './serve';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class CooperationService {
  url = DEVSERVER + 'api/schools/employerCooperations/';
  Authorization;
  httpOptions;
  constructor(
    private http: HttpClient,
  ) {
    this.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
  }
  acceptOrReject(employerID, state) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization
      })
    };
    this.http.put(this.url + employerID + '/' + state, this.httpOptions)
      .subscribe(
        rawObject => console.log(rawObject),
        err => console.log(err)
      );
  }
}
