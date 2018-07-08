import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DEVSERVER} from './serve';
import {JobIdService} from './job-id.service';
import {ApplyJobPreview} from '../class/apply-job-preview';
import {Shift} from '../class/shift';
import {GenderRequired} from '../class/gender-required';

@Injectable()
export class ApplyAEnrollmentService {
  httpOptions;
  Authorization;
  applyAJobsUrl = DEVSERVER + 'api/schools/enrollmentJobs/';
  applyAjobs: Array<ApplyJobPreview>;
  temptAppliedShifts: Array<Shift>;
  tempShift;
  constructor(
    private http: HttpClient,
    public jobIdService: JobIdService
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
    this.http.get(this.applyAJobsUrl + this.jobIdService.idJob + '/registeredCandidates' , this.httpOptions)
      .subscribe(
        rawObject => this.save(rawObject),
        err => console.log(err)
      );
  }
  save(rawObject) {
    this.applyAjobs = [];
    // console.log(this.temptAppliedShifts);
    for ( const obj of rawObject.data.results) {
      this.temptAppliedShifts = [];
      const s =  rawObject.data.results[0].enrollmentShift;
      this.temptAppliedShifts.push(new Shift(s.id, s.startTime, s.endTime, s.fee,
        s.name, s.mon, s.tue, s.wed, s.thu, s.fri, s.sat, s.sun, new GenderRequired(0, 0, 0)));
      this.applyAjobs.push(new ApplyJobPreview(obj.candidatePreview.id, obj.candidatePreview.firstName, obj.candidatePreview.lastName,
        obj.candidatePreview.avatarUrl, obj.candidatePreview.rating.attitudeRating,
        obj.candidatePreview.rating.attitudeRatingCount, obj.candidatePreview.rating.skillRating,
        obj.candidatePreview.rating.skillRatingCount, obj.candidatePreview.rating.jobAccomplishmentRating,
        obj.candidatePreview.rating.jobAccomplishmentRatingCount, this.temptAppliedShifts, obj.message, obj.candidatePreview.address,
        obj.candidatePreview.isProfileVerified, obj.createdDate));
    }
    // console.log(rawObject);
    // console.log(this.applyAjobs);
  }
}
