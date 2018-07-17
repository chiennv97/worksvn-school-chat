import {Injectable} from '@angular/core';
import {DEVSERVER} from './serve';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class CooperationService {
  url = DEVSERVER + 'api/schools/employerCooperations/';
  Authorization;
  httpOptions;
  constructor(
    public http: HttpClient,
  ) {
    this.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization
      })
    };
  }
  onSubmit(employerID, state) {
    console.log(this.httpOptions.headers);
    this.http.put(this.url + employerID + '/state/' + state, this.httpOptions)
      .subscribe(
        rawObject => console.log(rawObject),
        err => console.log(err)
      );
  }
}
