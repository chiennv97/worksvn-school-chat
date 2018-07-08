import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpHeaders} from '@angular/common/http';
import {ProfileApplyCandidateService} from '../service/profile-apply-candidate.service';

@Component({
  selector: 'app-candidate-apply',
  templateUrl: './candidate-apply.component.html',
  styleUrls: ['./candidate-apply.component.css']
})
export class CandidateApplyComponent implements OnInit {
  formRating: FormGroup;
  Authorization;
  httpOptions;
  constructor(
    public profileApplyCandidateService: ProfileApplyCandidateService,
  ) {
    this.Authorization = 'Bearer' + localStorage.getItem('accessToken');
  }

  ngOnInit() {
    // this.formRating = new FormGroup({
    //   comment: new FormControl(),
    // });
    // this.httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': this.Authorization,
    //     'Access-Control-Allow-Origin': '*',
    //   })
    // };
  }

}
