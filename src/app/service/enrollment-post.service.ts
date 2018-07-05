import {Injectable} from '@angular/core';
import {Shift} from '../class/shift';
import {GenderRequired} from '../class/gender-required';

@Injectable()
export class EnrollmentPostService {
  jobNameID: string;
  enrollmentJobTitle = '';
  schoolBranchID: string;
  description: string;
  requiredSkillIDs = [];
  shiftBodies = [];
  tempGenderRequireds: Array<GenderRequired>;
  expirationDate: number;
  addNewUser() {
    this.shiftBodies = [];
    this.shiftBodies.push(new Shift('', 0, 0,
      0, '', false, false, false, false,
      false, false, false, [], 0));
  }
  remove() {
    this.enrollmentJobTitle = '';
  }
}
