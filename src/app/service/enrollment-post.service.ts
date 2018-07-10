import {Injectable} from '@angular/core';
import {Shift} from '../class/shift';
import {GenderRequired} from '../class/gender-required';

@Injectable()
export class EnrollmentPostService {
  jobNameID: string;
  enrollmentJobTitle = '';
  schoolBranchID: string;
  description: string;
  accquiredSkillIDs = [];
  shiftBodies = [];
  tempGenderRequireds: Array<GenderRequired>;
  expirationDate: number;
  add(rawObject, type) {
    console.log(rawObject);
    if ( type === 1) {
      this.enrollmentJobTitle = rawObject.data.jobTitle;
      this.jobNameID = rawObject.data.jobName.id;
      this.schoolBranchID = rawObject.data.schoolBranchID;
      this.description = rawObject.data.description;
      this.accquiredSkillIDs = [];
      this.shiftBodies = [];
      this.expirationDate = rawObject.data.expirationDate;
      for (const obj of rawObject.data.accquiredSkills) {
        this.accquiredSkillIDs.push(obj.id);
      }
      for (const obj of rawObject.data.shifts) {
        this.tempGenderRequireds = new Array<GenderRequired>();
        for ( const s of obj.genderRequireds) {
          this.tempGenderRequireds.push(new GenderRequired(s.gender, s.quantity, s.applied));
        }
        this.shiftBodies.push(new Shift(obj.id, obj.startTime, obj.endTime,
          obj.fee, obj.name, obj.mon, obj.tue, obj.wed, obj.thu,
          obj.fri, obj.sat, obj.sun, this.tempGenderRequireds));
      }
    }
    if ( type === 2 ) {
      this.enrollmentJobTitle = rawObject.data.jobTitle;
      this.jobNameID = rawObject.data.jobName.id;
      this.schoolBranchID = rawObject.data.enrollmentJobBody.schoolBranchID;
      this.description = rawObject.data.enrollmentJobBody.description;
      this.accquiredSkillIDs = [];
      this.shiftBodies = [];
      this.expirationDate = rawObject.data.enrollmentJobBody.expirationDate;
      if ( rawObject.data.enrollmentJobBody.accquiredSkillIDs !== null ) {
        for (const obj of rawObject.data.enrollmentJobBody.accquiredSkillIDs) {
          this.accquiredSkillIDs.push(obj);
        }
      }
      for (const obj of rawObject.data.enrollmentJobBody.shiftBodies) {
        this.tempGenderRequireds = new Array<GenderRequired>();
        for ( const s of obj.genderRequireds) {
          this.tempGenderRequireds.push(new GenderRequired(s.gender, s.quantity, s.applied));
        }
        this.shiftBodies.push(new Shift(obj.id, obj.startTime, obj.endTime,
          obj.fee, obj.name, obj.mon, obj.tue, obj.wed, obj.thu,
          obj.fri, obj.sat, obj.sun, this.tempGenderRequireds));
      }
    }
  }
  addNewUser() {
    this.shiftBodies = [];
    this.shiftBodies.push(new Shift('', 0, 0,
      0, '', false, false, false, false,
      false, false, false, []));
  }
  remove() {
    this.enrollmentJobTitle = '';
  }
}
