import { Component, OnInit } from '@angular/core';
import {YearService} from '../service/year.service';
import {MajorService} from '../service/major.service';
import {ListStudentService} from '../service/list-student.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {DEVSERVER} from '../service/serve';
import {ProfileApplyCandidateService} from '../service/profile-apply-candidate.service';
@Component({
  selector: 'app-manager-student',
  templateUrl: './manager-student.component.html',
  styleUrls: ['./manager-student.component.css']
})
export class ManagerStudentComponent implements OnInit {
  httpOptions;
  Authorization;
  getStudentUrl = DEVSERVER + 'api/schools/students';
  constructor(
    public yearService: YearService,
    public majorService: MajorService,
    public listStudentService: ListStudentService,
    private http: HttpClient,
    public profileApplyCandidateService: ProfileApplyCandidateService,
  ) {
    this.Authorization = 'Bearer' + localStorage.getItem('accessToken');
  }

  ngOnInit() {
    this.yearService.onSubmit();
    this.majorService.onSubmit();
  }
  changedYear(event) {
    this.yearService.currentSelectId = event.value;
    if ( this.majorService.currentSelectId !== undefined) {
      this.onSubmit();
    }
  }
  changedMajor(event) {
    this.majorService.currentSelectId = event.value;
    if ( this.yearService.currentSelectId !== undefined) {
      this.onSubmit();
    }
  }
  onSubmit() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization
      }),
      params: new HttpParams().set('year', this.yearService.currentSelectId).set('majorID', this.majorService.currentSelectId)
    };
    this.http.get(this.getStudentUrl , this.httpOptions)
      .subscribe(
        rawObject => this.listStudentService.onSubmit(rawObject),
        err => console.log(err)
      );
  }
  changePage(p, target) {
    target.scrollIntoView();
    this.listStudentService.pageNum = p;
  }
  openProfile(i) {
    this.profileApplyCandidateService.onSubmit(2, this.listStudentService.listStudent[i].id);
  }
}
