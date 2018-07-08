import {Shift} from './shift';

export class ApplyJobPreview {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  attitudeRating: number;
  attitudeRatingCount: number;
  skillRating: number;
  skillRatingCount: number;
  jobAccomplishmentRating: number;
  jobAccomplishmentRatingCount: number;
  appliedShifts: Array<Shift>;
  message: string;
  address: string;
  isProfileVerified: boolean;
  appliedDate: number;
  constructor(id: string, firstName: string, lastName: string,
              avatarUrl: string, attitudeRating: number,
              attitudeRatingCount: number, skillRating: number,
              skillRatingCount: number, jobAccomplishmentRating: number,
              jobAccomplishmentRatingCount: number, appliedShifts: Array<Shift>,
              message: string, address: string, isProfileVerified: boolean, appliedDate: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.avatarUrl = avatarUrl;
    this.attitudeRating = attitudeRating;
    this.attitudeRatingCount = attitudeRatingCount;
    this.skillRating = skillRating;
    this.skillRatingCount = skillRatingCount;
    this.jobAccomplishmentRating = jobAccomplishmentRating;
    this.jobAccomplishmentRatingCount = jobAccomplishmentRatingCount;
    this.appliedShifts = appliedShifts;
    this.message = message;
    this.address = address;
    this.isProfileVerified = isProfileVerified;
    this.appliedDate = appliedDate;
  }
}
