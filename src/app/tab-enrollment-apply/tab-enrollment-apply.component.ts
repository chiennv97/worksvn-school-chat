import { Component, OnInit } from '@angular/core';
import {CandidateIdService} from '../service/candidate-id.service';
import {ApplyAEnrollmentService} from '../service/apply-a-enrollment.service';
import {ProfileApplyCandidateService} from '../service/profile-apply-candidate.service';

@Component({
  selector: 'app-tab-enrollment-apply',
  templateUrl: './tab-enrollment-apply.component.html',
  styleUrls: ['./tab-enrollment-apply.component.css']
})
export class TabEnrollmentApplyComponent implements OnInit {

  constructor(
    public candidateIdService: CandidateIdService,
    public applyAEnrollmentService: ApplyAEnrollmentService,
    public profileApplyCandidateService: ProfileApplyCandidateService,
  ) { }

  ngOnInit() {
  }
  showDetail(i) {
    this.candidateIdService.idCandidate = this.applyAEnrollmentService.applyAjobs[i].id;
    this.profileApplyCandidateService.onSubmit(1);
  }
}
