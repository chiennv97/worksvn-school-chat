import {Injectable} from '@angular/core';
import {DEVSERVER} from './serve';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Select2data} from '../class/select2data';

@Injectable()
export class BranchsService {
  Authorization: string;
  httpOptions;
  getBranchsUrl = DEVSERVER + 'api/schools/schoolBranchs';
  branchId: Array<string>;
  name: Array<string>;
  address: Array<string>;
  select2datas: Array<Select2data>;
  currentSelectId: string;
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
    this.http.get(this.getBranchsUrl , this.httpOptions)
      .subscribe(
        rawObject => this.save(rawObject, type),
        err => console.log(err)
      );
  }
  save(rawObject, type) {
    console.log(rawObject);
    this.branchId = new Array<string>();
    this.name = new Array<string>();
    this.address = new Array<string>();
    this.select2datas = new Array<Select2data>();
    for (const obj of rawObject.data) {
      this.branchId.push(obj.id);
      this.name.push(obj.branchName);
      this.address.push(obj.address);
      this.select2datas.push(new Select2data(obj.id, obj.branchName + ' - ' + obj.address));
    }
  }
  saveCurrentSelect(currentSelectId) {
    this.currentSelectId = currentSelectId;
  }
}
