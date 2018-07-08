import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DEVSERVER} from './serve';
import {Select2data} from '../class/select2data';

@Injectable()
export class YearService {
  Authorization;
  httpOptions;
  getYearUrl = DEVSERVER + 'api/schools/students/years';
  select2datas: Array<Select2data>;
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
    this.http.get(this.getYearUrl , this.httpOptions)
      .subscribe(
        rawObject => this.save(rawObject),
        err => console.log(err)
      );
  }
  save(rawObject) {
    this.select2datas = [];
    for (const obj of rawObject.data ) {
      this.select2datas.push(new Select2data(obj, obj));
    }
  }
}
