import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DEVSERVER} from './serve';

@Injectable()
export class HoptacService {
  httpOptions;
  url = DEVSERVER + 'api/schools/employerCooperations/';
  Authorization;
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
  onSubmit(employerID, state, httpOption) {
    // console.log(httpOption);
    this.http.put(this.url + employerID + '/state/' + state, null, httpOption)
      .subscribe(
        rawObject => console.log(rawObject),
        err => console.log(err)
      );
  }
}
