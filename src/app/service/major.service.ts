import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DEVSERVER} from './serve';
import {Select2data} from '../class/select2data';

@Injectable()
export class MajorService {
  Authorization;
  httpOptions;
  select2datas: Array<Select2data>;
  getMajorUrl = DEVSERVER + 'api/majors';
  currentSelectId;
  constructor(
    private http: HttpClient,
  ) {
    this.Authorization = 'Bearer' + localStorage.getItem('accessToken');
  }
  onSubmit() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization
      })
    };
    this.http.get(this.getMajorUrl , this.httpOptions)
      .subscribe(
        rawObject => this.save(rawObject),
        err => console.log(err)
      );
  }
  save(rawObject) {
    this.select2datas = [];
    for (const obj of rawObject.data.results ) {
      this.select2datas.push(new Select2data(obj.id, obj.name));
    }
  }
}
