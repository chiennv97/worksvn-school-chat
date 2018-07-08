import { Injectable } from '@angular/core';
import {Shift} from '../class/shift';
import {GenderRequired} from '../class/gender-required';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DEVSERVER} from './serve';
@Injectable()
export class TabEnrollmentDetailService {
  jobTitle: string;
  jobName: string;
  jobNameId: string;
  address: string;
  isAtHeadquarters: boolean;
  createdDate: string;
  expirationDate: string;
  accquiredSkills: Array<string>;
  accquiredSkillsID: Array<string>;
  schoolBranchID: string;
  schoolBranchName: string;
  description: string;
  tempGenderRequireds: Array<GenderRequired>;
  shifts: Array<Shift>;
  schoolLogoUrl: string;
  schoolName: string;
  lat;
  lon;
  httpOptions;
  detailJobsUrl;
  Authorization;
  hasAppliedCandidate: boolean;
  constructor(
    private http: HttpClient,
  ) {
    this.Authorization = 'Bearer' + localStorage.getItem('accessToken');
  }
  add(rawObject) {
    this.jobTitle = rawObject.data.jobTitle;
    this.schoolLogoUrl = rawObject.data.schoolLogoUrl;
    this.schoolName = rawObject.data.schoolName;
    this.jobName = rawObject.data.jobName.name;
    this.jobNameId = rawObject.data.jobName.id;
    this.address = rawObject.data.address;
    this.isAtHeadquarters = rawObject.data.isAtHeadquarters;
    this.createdDate = rawObject.data.createdDate;
    this.expirationDate = rawObject.data.expirationDate;
    this.accquiredSkills = new Array<string>();
    this.accquiredSkillsID = new Array<string>();
    this.schoolBranchID = rawObject.data.schoolBranchID;
    this.schoolBranchName = rawObject.data.schoolBranchName;
    this.description = rawObject.data.description;
    this.hasAppliedCandidate = rawObject.data.hasAppliedCandidate;
    for (const obj of rawObject.data.accquiredSkills) {
      this.accquiredSkills.push(obj.name);
      this.accquiredSkillsID.push(obj.id);
    }
    this.shifts = new Array<Shift>();
    for (const obj of rawObject.data.shifts) {
      this.tempGenderRequireds = new Array<GenderRequired>();
      for ( const s of obj.genderRequireds) {
        this.tempGenderRequireds.push(new GenderRequired(s.gender, s.quantity, s.applied));
      }
      this.shifts.push(new Shift(obj.id, obj.startTime, obj.endTime,
        obj.fee, obj.unit, obj.mon, obj.tue, obj.wed, obj.thu,
        obj.fri, obj.sat, obj.sun, this.tempGenderRequireds));
    }
    this.lat = rawObject.data.lat;
    this.lon = rawObject.data.lon;
  }
  removes() {
    this.jobTitle = '';
    this.jobName = '';
    this.jobNameId = '';
    this.address = '';
    this.isAtHeadquarters = false;
    this.createdDate = '';
    this.expirationDate = '';
    this.accquiredSkills = [];
    this.accquiredSkillsID = [];
    this.schoolBranchID = '';
    this.schoolBranchName = '';
    this.description = '';
    this.tempGenderRequireds = [];
    this.shifts = [];
    this.schoolLogoUrl = '';
    this.schoolName = '';
    this.lat = 0;
    this.lon = 0;
    this.hasAppliedCandidate = false;
  }
  onSubmit(idJob) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization
      })
    };
    this.detailJobsUrl = DEVSERVER + 'api/schools/enrollmentJobs/' + idJob;
    // console.log(this.detailJobsUrl);
    this.http.get(this.detailJobsUrl , this.httpOptions)
      .subscribe(
        jobdetail => this.saveJobDetail(jobdetail),
        err => console.log(err)
      );
  }
  saveJobDetail(jobdetail) {
    this.removes();
    this.add(jobdetail);
  }
}
