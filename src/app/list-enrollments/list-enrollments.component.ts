import { Component, OnInit } from '@angular/core';
import {ChoosePostTypeService} from '../service/choose-post-type.service';
import {DEVSERVER} from '../service/serve';
import {PaginationService} from '../service/pagination.service';
import {OverviewPostService} from '../service/overview-post.service';
import {ChangeTabService} from '../service/change-tab.service';
import {Router} from '@angular/router';
import {JobIdService} from '../service/job-id.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import swal from 'sweetalert2';
import {FormArray, FormBuilder} from '@angular/forms';
import {FormUploadService} from '../service/form-upload.service';
import {EnrollmentPostService} from '../service/enrollment-post.service';
import {BranchsService} from '../service/branchs.service';
import {JobNameIdService} from '../service/job-name-id.service';
import {SkillService} from '../service/skill.service';
import {ShiftOptionService} from '../service/shift-option.service';
@Component({
  selector: 'app-list-enrollments',
  templateUrl: './list-enrollments.component.html',
  styleUrls: ['./list-enrollments.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class ListEnrollmentsComponent implements OnInit {
  activeEnrollmentJobsUrl = DEVSERVER + 'api/schools/activeEnrollmentJobs';
  expiredEnrollmentJobsUrl = DEVSERVER + 'api/schools/expiredEnrollmentJobs';
  pendingPostsUrl = DEVSERVER + 'api/schools/enrollmentJobs/pendingPosts';
  mq = window.matchMedia('(min-width: 600px)');
  widthDisplay = this.mq.matches ? 1000 : 500;
  editJobPendingUrl = DEVSERVER + 'api/schools/enrollmentJobs/';
  detailJobsUrl = DEVSERVER + 'api/schools/enrollmentJobs/';
  Authorization;
  httpOptions;
  soluongtheogioitinh;
  temptGenderQuatity;
  temptGenderFemale;
  temptGenderMan;
  styles;
  temptfee;
  temptName;
  constructor(
    public choosePostTypeService: ChoosePostTypeService,
    public paginationService: PaginationService,
    public overviewPostService: OverviewPostService,
    public changeTabService: ChangeTabService,
    private router: Router,
    public jobIdService: JobIdService,
    private http: HttpClient,
    public formUploadService: FormUploadService,
    public enrollmentPostService: EnrollmentPostService,
    public branchsService: BranchsService,
    public jobNameIdService: JobNameIdService,
    public skillService: SkillService,
    public shiftOptionService: ShiftOptionService,
    private fb: FormBuilder,
  ) {
    this.Authorization = 'Bearer' + localStorage.getItem('accessToken');
  }

  ngOnInit() {
    this.onSubmit();
  }
  onSubmit() {
    // this.overviewPostService.removes();
    if (this.choosePostTypeService.chooseType === 1) {
      this.overviewPostService.onSubmit(this.activeEnrollmentJobsUrl, this.paginationService.pageIndex, 0);
    } else if (this.choosePostTypeService.chooseType === 2) {
      this.overviewPostService.onSubmit(this.expiredEnrollmentJobsUrl, this.paginationService.pageIndex, 0);
    } else if (this.choosePostTypeService.chooseType === 3) {
      this.overviewPostService.onSubmit(this.pendingPostsUrl, this.paginationService.pageIndex, 1);
    }
  }
  // Change type of posts
  myToggle(type) {
    this.choosePostTypeService.setChooseType(type);
    // this.selectTypePostService.selectType = type;
    // console.log(type.name);
    this.onSubmit();
  }
  changePage(p, target) {
    target.scrollIntoView();
    this.paginationService.pageNum = p;
    p = p - 1;
    const stringP = p.toString();
    // console.log(stringP);
    // this.overviewPostService.removes();
    if (this.choosePostTypeService.chooseType === 1) {
      this.overviewPostService.onSubmit(this.activeEnrollmentJobsUrl, stringP, 0);
      this.paginationService.pageIndex = stringP;
    } else if (this.choosePostTypeService.chooseType === 2) {
      this.overviewPostService.onSubmit(this.expiredEnrollmentJobsUrl, stringP, 0);
      this.paginationService.pageIndex = stringP;
    } else if (this.choosePostTypeService.chooseType === 3) {
      this.overviewPostService.onSubmit(this.pendingPostsUrl, stringP, 1);
      this.paginationService.pageIndex = stringP;
    }
  }
  onResize(event) {
    this.widthDisplay = event.target.innerWidth;
    // console.log(event.target.innerWidth);
  }
  redirectToPage(id, i) {
    this.changeTabService.tabChange = 0;
    this.router.navigate(['manage/enrollment-detail/' + id ]);
    window.scroll({top: 0, left: 0});
    this.jobIdService.indexJob = i;
  }
  redirectToApply(id, i) {
    this.changeTabService.tabChange = 1;
    this.router.navigate(['manage/job-detail/' + id]);
    window.scroll({top: 0, left: 0});
    this.jobIdService.indexJob = i;
  }
  redirectToSuitable(id, i) {
    this.changeTabService.tabChange = 2;
    this.router.navigate(['manage/job-detail/' + id]);
    window.scroll({top: 0, left: 0});
    this.jobIdService.indexJob = i;
  }
  redirectToEditPage(id, i) {
    this.router.navigate(['manage/edit-post-enrollment/editPenPost/' + id]);
    this.jobIdService.idJob = id;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization
      })
    };
    console.log(id);
    this.http.get(this.editJobPendingUrl + 'pendingPosts/' + id, this.httpOptions)
      .subscribe(
        jobdetail => this.saveToReuse(jobdetail, 2),
        err => console.log(err)
      );
  }
  hiddenJob(hidden, id, i) {
    this.overviewPostService.hiddenJob(hidden, id, i);
  }

  plusDate(id, i) {
    this.overviewPostService.plusDate(id, i);
  }
  deleteJob(obj, i, type) {
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
        if ( type === 1 ) {
          this.overviewPostService.deleteJob(obj, i, 1, swal);
        }
        if ( type === 0 ) {
          this.overviewPostService.deleteJob(obj, i, 0, swal);
        }
      }
    });
    // this.overviewPostService.deleteJob(obj, i);
  }
  reusePost(i) {
    // this.overviewPostService.removes();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization
      })
    };
    // console.log(this.overviewPostService.activeJobs);
    this.jobIdService.idJob = this.overviewPostService.activeJobs[i].id;
    this.detailJobsUrl = this.detailJobsUrl + this.jobIdService.idJob;
    // console.log(this.detailJobsUrl);
    this.http.get(this.detailJobsUrl , this.httpOptions)
      .subscribe(
        jobdetail => this.saveToReuse(jobdetail, 1),
        err => console.log(err)
      );
    this.router.navigate(['manage/up-post-enrollment/upClonePost']);
  }
  get users(): FormArray {
    return this.formUploadService.formUpload.get('users') as FormArray;
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
      if ( this.enrollmentPostService.shiftBodies[i].fee ===  0 ) {
        this.shiftOptionService.fee[i] = true;
      } else {
        this.shiftOptionService.fee[i] = false;
        this.temptfee = this.enrollmentPostService.shiftBodies[i].fee;
      }
      this.temptName = this.enrollmentPostService.shiftBodies[i].name;
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
  chooseType(i) {
    this.choosePostTypeService.setChooseType(i);
    this.paginationService.pageIndex = '0';
    this.paginationService.pageNum = 1;
    // this.overviewPostService.removes();
    if (this.choosePostTypeService.chooseType === 1) {
      this.overviewPostService.onSubmit(this.activeEnrollmentJobsUrl, this.paginationService.pageIndex, 0);
    } else if (this.choosePostTypeService.chooseType === 2) {
      this.overviewPostService.onSubmit(this.expiredEnrollmentJobsUrl, this.paginationService.pageIndex, 0);
    } else if (this.choosePostTypeService.chooseType === 3) {
      this.overviewPostService.onSubmit(this.pendingPostsUrl, this.paginationService.pageIndex, 1);
    }
  }
  setMyStyles(i) {
    this.styles = {
      'background-color': (this.choosePostTypeService.chooseType === i) ? '#57b4ff' : 'rgb(227, 227, 227)',
      'font-size': '1em',
      'color': (this.choosePostTypeService.chooseType === i) ? 'white' : '#000000a8'
    };
    return this.styles;
  }
}
