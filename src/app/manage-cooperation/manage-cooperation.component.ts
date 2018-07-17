import { Component, OnInit } from '@angular/core';
import {ManageCooperationService} from '../service/manage-cooperation.service';
import {DEVSERVER} from '../service/serve';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ProfileEmployerService} from '../service/profile-employer.service';
import {CooperationService} from '../service/cooperation.service';
import {HoptacService} from '../service/hoptac.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-manage-cooperation',
  templateUrl: './manage-cooperation.component.html',
  styleUrls: ['./manage-cooperation.component.css']
})
export class ManageCooperationComponent implements OnInit {
  Authorization;
  httpOptions;
  getEmployerAcceptUrl = DEVSERVER + 'api/schools/employerCooperations/state/accepted';
  getEmployerPenUrl = DEVSERVER + 'api/schools/employerCooperations/state/pending';
  getEmployerProfile = DEVSERVER + 'api/employers/';
  styles;
  chooseType = 1;
  constructor(
    public manageCooperationService: ManageCooperationService,
    private http: HttpClient,
    public profileEmployerService: ProfileEmployerService,
    public cooperationService: HoptacService
  ) {
    this.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
  }
  ngOnInit() {
    this.onSubmit(this.getEmployerAcceptUrl, 1);
  }
  onSubmit(url, type) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization
      })
    };
    console.log(this.httpOptions);
    this.http.get(url , this.httpOptions)
      .subscribe(
        rawObject => this.manageCooperationService.onSubmit(rawObject, type),
        err => console.log(err)
      );
  }
  setMyStyles(i) {
    this.styles = {
      'background-color': (this.chooseType === i) ? '#57b4ff' : 'rgb(227, 227, 227)',
      'font-size': '1em',
      'color': (this.chooseType === i) ? 'white' : '#000000a8'
    };
    return this.styles;
  }
  actionChooseType(i) {
    this.chooseType = i;
    if (this.chooseType === 1 ) {
      this.onSubmit(this.getEmployerAcceptUrl, 1);
    }
    if ( this.chooseType === 2) {
      this.onSubmit(this.getEmployerPenUrl, 2);
    }
  }
  openProfileEmployer(i) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization
      })
    };
    this.http.get(this.getEmployerProfile + this.manageCooperationService.listEmployer[i].id , this.httpOptions)
      .subscribe(
        rawObject => this.profileEmployerService.onSubmit(rawObject),
        err => console.log(err)
      );
  }
  accept(i) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization
      })
    };
    this.cooperationService.onSubmit(this.manageCooperationService.listEmployer[i].id, 'accepted', this.httpOptions);
    this.onSubmit(this.getEmployerPenUrl, 2);
  }
  reject(i) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization
      })
    };
    this.cooperationService.onSubmit(this.manageCooperationService.listEmployer[i].id, 'rejected', this.httpOptions);
    this.onSubmit(this.getEmployerPenUrl, 2);
  }
}
