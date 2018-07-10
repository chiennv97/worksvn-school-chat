import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ActivationEnd, Router} from '@angular/router';
import {JobIdService} from '../service/job-id.service';
import {TabEnrollmentDetailService} from '../service/tab-enrollment-detail.service';
import swal from 'sweetalert2';
import {OverviewPostService} from '../service/overview-post.service';
import {ChangeTabService} from '../service/change-tab.service';
import {ApplyAEnrollmentService} from '../service/apply-a-enrollment.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DEVSERVER} from '../service/serve';
import {EnrollmentPostService} from '../service/enrollment-post.service';
import {FormUploadService} from '../service/form-upload.service';
import {BranchsService} from '../service/branchs.service';
import {JobNameIdService} from '../service/job-name-id.service';
import {SkillService} from '../service/skill.service';
import {ShiftOptionService} from '../service/shift-option.service';
import {FormArray, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-enrollment-detail',
  templateUrl: './enrollment-detail.component.html',
  styleUrls: ['./enrollment-detail.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class EnrollmentDetailComponent implements OnInit {
  id;
  mq = window.matchMedia('(min-width: 600px)');
  widthDisplay = this.mq.matches ? 1000 : 500;
  Authorization;
  httpOptions;
  detailJobsUrl;
  soluongtheogioitinh;
  temptGenderQuatity;
  temptGenderFemale;
  temptGenderMan;
  temptfee;
  temptName;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public jobIdService: JobIdService,
    // tabJobDetailService
    public tabEnrollmentDetailService: TabEnrollmentDetailService,
    public overviewPostService: OverviewPostService,
    public changeTabService: ChangeTabService,
    public applyAEnrollmentService: ApplyAEnrollmentService,
    private http: HttpClient,
    public enrollmentPostService: EnrollmentPostService,
    public formUploadService: FormUploadService,
    public branchsService: BranchsService,
    public jobNameIdService: JobNameIdService,
    public skillService: SkillService,
    public shiftOptionService: ShiftOptionService,
    private fb: FormBuilder,
  ) {
    this.Authorization = 'Bearer' + localStorage.getItem('accessToken');
    router.events.subscribe((val) => {
        if (val instanceof ActivationEnd) {
          if ( val.snapshot.paramMap.get('id') !== null) {
            this.jobIdService.idJob = val.snapshot.paramMap.get('id');
          }
        }
    });
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.jobIdService.idJob = this.id;
    this.tabEnrollmentDetailService.onSubmit(this.jobIdService.idJob);
    // this.applyAJobService.onSubmit(); thay bang hasAppliedCandidate
    this.applyAEnrollmentService.onSubmit();
  }
  deleteJob() {
    if (this.tabEnrollmentDetailService.hasAppliedCandidate === false) {
      swal({
        title: 'Bạn có chắc chắn xóa?',
        text: 'Bạn không thể quay lại sau khi đã xóa',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý xóa!',
        cancelButtonText: 'Bỏ qua!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.overviewPostService.deleteJob(this.jobIdService.idJob, -1, 0, swal);
        }
      });
    } else {
      this.cannotEditOrRemove();
    }
  }
  cannotEditOrRemove() {
    swal({
      title: 'Bạn không thể sửa hoặc xóa công việc này',
      text: 'Không thể sửa hoặc xóa công việc đã có người ứng tuyển',
      type: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Đồng ý!',
      confirmButtonClass: 'btn btn-success',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
    });
  }
  onResize(event) {
    this.widthDisplay = event.target.innerWidth;
    // console.log(event.target.innerWidth);
  }
  editPost() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization
      })
    };
    // console.log(this.overviewPostService.activeJobs);
    // this.jobIdService.idJob = this.overviewPostService.activeJobs[i].id;
    this.detailJobsUrl = DEVSERVER + 'api/schools/enrollmentJobs/' + this.jobIdService.idJob;
    this.http.get(this.detailJobsUrl , this.httpOptions)
      .subscribe(
        jobdetail => this.saveToReuse(jobdetail, 1),
        err => console.log(err)
      );
    this.router.navigate(['edit-post-enrollment/editPost/' + this.jobIdService.idJob]);
  }
  saveToReuse(jobdetail, type) {
    this.enrollmentPostService.add(jobdetail, type);
    const date = new Date(this.enrollmentPostService.expirationDate);
    this.formUploadService.formUpload.patchValue({
      enrollmentJobTitle: this.enrollmentPostService.enrollmentJobTitle,
      description: this.enrollmentPostService.description,
      expirationDate: date
    });
    this.jobNameIdService.currentSelectId = this.enrollmentPostService.jobNameID;
    this.branchsService.currentSelectId = this.enrollmentPostService.schoolBranchID;
    // for ( const select of this.jobPostService.requiredSkillIDs) {
    //   this.skillService.currentSelectId.push(select);
    // }
    this.skillService.onSubmit(2);
    for (let i = 0; i < this.enrollmentPostService.shiftBodies.length; i++) {
      this.soluongtheogioitinh = true;
      this.temptGenderQuatity = null;
      this.temptGenderFemale = null;
      this.temptGenderMan = null;
      for (const genderRe of this.enrollmentPostService.shiftBodies[i].genderRequireds) {
        if (genderRe.gender === 2) {
          this.soluongtheogioitinh = false;
        }
      }
      this.shiftOptionService.soluongtheogioitinh.splice(i, 0, this.soluongtheogioitinh);
      // if ( this.jobPostService.shiftBodies[i].minSalary ===  -1) {
      //   this.temptMinSalary = null;
      // } else {
      //   this.temptMinSalary = this.jobPostService.shiftBodies[i].minSalary;
      // }
      // if ( this.jobPostService.shiftBodies[i].maxSalary ===  -1) {
      //   this.temptMaxSalary = null;
      // } else {
      //   this.temptMaxSalary = this.jobPostService.shiftBodies[i].maxSalary;
      // }
      this.temptName = this.enrollmentPostService.shiftBodies[i].name;
      if ( this.enrollmentPostService.shiftBodies[i].fee ===  0 ) {
        this.shiftOptionService.fee[i] = true;
      } else {
        this.shiftOptionService.fee[i] = false;
        this.temptfee = this.enrollmentPostService.shiftBodies[i].fee;
      }
      if ( this.soluongtheogioitinh === true ) {
        for (const req of this.enrollmentPostService.shiftBodies[i].genderRequireds) {
          if (req.gender === 0) {
            this.temptGenderFemale = req.quantity;
          }
          if (req.gender === 1) {
            this.temptGenderMan = req.quantity;
          }
        }
        this.temptGenderQuatity = 0;
      }
      if ( this.soluongtheogioitinh === false ) {
        for (const req of this.enrollmentPostService.shiftBodies[i].genderRequireds){
          if (req.gender === 2) {
            this.temptGenderQuatity = req.quantity;
          }
        }
        this.temptGenderFemale = 0;
        this.temptGenderMan = 0;
      }
      this.users.insert(i, this.fb.group({
        name: this.temptName,
        fee: this.temptfee,
        genderMan: this.temptGenderMan,
        genderFemale: this.temptGenderFemale,
        genderQuatity: this.temptGenderQuatity
      }));
    }
  }
  get users(): FormArray {
    return this.formUploadService.formUpload.get('users') as FormArray;
  }
}
