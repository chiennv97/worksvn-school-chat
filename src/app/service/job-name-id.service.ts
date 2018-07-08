import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DEVSERVER} from './serve';
import {Select2data} from '../class/select2data';



@Injectable()
export class JobNameIdService {
  Authorization: string;
  httpOptions;
  getJobNameUrl = DEVSERVER + 'api/jobNames';
  jobNameID: Array<string>;
  jobGroupID: Array<string>;
  name: Array<string>;
  select2datas: Array<Select2data>;
  currentSelectId: string;
  index: number;
  constructor(
    private http: HttpClient,
  ) {
    this.Authorization = 'Bearer' + localStorage.getItem('accessToken');
  }
  onSubmit(type) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization
      })
    };
    this.http.get(this.getJobNameUrl , this.httpOptions)
      .subscribe(
        rawObject => this.save(rawObject, type),
        err => console.log(err)
      );
  }
  save(rawObject, type) {
    console.log('lay job name');
    this.jobNameID = new Array<string>();
    this.jobGroupID = new Array<string>();
    this.name = new Array<string>();
    this.select2datas = new Array<Select2data>();
    this.index = -1;
    for (const obj of rawObject.data.results){
      this.index++;
      this.jobNameID.push(obj.id);
      this.jobGroupID.push(obj.jobGroupID);
      this.name.push(obj.name);
      this.select2datas.push(new Select2data(obj.id, obj.name));
    }
  }
  saveCurrentSelect(currentSelectId) {
    this.currentSelectId = currentSelectId;
  }
}
