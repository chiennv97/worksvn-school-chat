import {Select2data} from '../class/select2data';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {DEVSERVER} from './serve';
import {EnrollmentPostService} from './enrollment-post.service';
@Injectable()
export class SkillService {
  Authorization: string;
  httpOptions;
  getSkillsUrl = DEVSERVER + 'api/skills';
  skilId: Array<string>;
  name: Array<string>;
  select2datas: Array<Select2data>;
  currentSelectId: Array<string>;
  constructor(
    private http: HttpClient,
    public enrollmentPostService: EnrollmentPostService,
  ) {
    this.Authorization = 'Bearer' + localStorage.getItem('accessToken');
  }
  onSubmit(type) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization
        // 'Access-Control-Request-Method': 'POST',
        // 'Access-Control-Request-Headers': 'Content-Type, Authorization'
      })
    };
    this.http.get(this.getSkillsUrl , this.httpOptions)
      .subscribe(
        rawObject => this.save(rawObject, type),
        err => console.log(err)
      );
  }
  save(rawObject, type) {
    this.skilId = new Array<string>();
    this.name = new Array<string>();
    this.select2datas = new Array<Select2data>();
    this.currentSelectId = [];
    for (const obj of rawObject.data.results) {
      this.skilId.push(obj.id);
      this.name.push(obj.name);
      this.select2datas.push(new Select2data(obj.id, obj.name));
    }
    if ( type === 2 ) {
      for (const s of this.enrollmentPostService.accquiredSkillIDs) {
        this.currentSelectId.push(s);
      }
    }
  }
  saveCurrentSelect(currentSelectId) {
    this.currentSelectId = currentSelectId;
  }
}
