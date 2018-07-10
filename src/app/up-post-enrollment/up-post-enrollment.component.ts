import { Component, OnInit } from '@angular/core';
import {BranchsService} from '../service/branchs.service';
import {JobNameIdService} from '../service/job-name-id.service';
import {SkillService} from '../service/skill.service';
import {FormUploadService} from '../service/form-upload.service';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {ShiftOptionService} from '../service/shift-option.service';
import {EnrollmentPostService} from '../service/enrollment-post.service';
import {ConvertTimePipe} from '../pipe/convert-time.pipe';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {Shift} from '../class/shift';
import {GenderRequired} from '../class/gender-required';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UpOrEditService} from '../service/up-or-edit.service';
import {DEVSERVER} from '../service/serve';
import {JobIdService} from '../service/job-id.service';
import {ActivationEnd, Router} from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepickerInputEvent, MatSnackBar} from '@angular/material';
import {ChoosePostTypeService} from '../service/choose-post-type.service';
@Component({
  selector: 'app-up-post-enrollment',
  templateUrl: './up-post-enrollment.component.html',
  styleUrls: ['./up-post-enrollment.component.css']
})
export class UpPostEnrollmentComponent implements OnInit {
  options;
  mq = window.matchMedia('(min-width: 768px)');
  widthDisplay = this.mq.matches ? 1000 : 500;
  convertTime;
  errorTime = false;
  errorDay = false;
  errorQuan = false;
  Authorization: string;
  httpOptions;
  upPost = false;
  postPendingJobUrl = DEVSERVER + 'api/schools/enrollmentJobs/pendingPosts';
  editPostUrl = DEVSERVER + 'api/schools/enrollmentJobs/';
  constructor(
    public branchsService: BranchsService,
    public jobNameIdService: JobNameIdService,
    public skillService: SkillService,
    public formUploadService: FormUploadService,
    private fb: FormBuilder,
    // giống luongThoaThuanService
    public shiftOptionService: ShiftOptionService,
    // JobPostService
    public enrollmentPostService: EnrollmentPostService,
    private atp: AmazingTimePickerService,
    public upOrEditService: UpOrEditService,
    private http: HttpClient,
    public jobIdService: JobIdService,
    private router: Router,
    public snackBar: MatSnackBar,
    public choosePostTypeService: ChoosePostTypeService,
  ) {
    this.Authorization = 'Bearer' + localStorage.getItem('accessToken');
    router.events.subscribe((val) => {
      if (val instanceof ActivationEnd) {
        if ( val.snapshot.paramMap.get('type') === 'editPenPost') {
          this.upOrEditService.type = 2;
        }
        if ( val.snapshot.paramMap.get('type') === 'upClonePost') {
          this.upOrEditService.type = 1;
        }
        if ( val.snapshot.paramMap.get('type') === 'upPost') {
          this.upOrEditService.type = 1;
        }
        if ( val.snapshot.paramMap.get('type') === 'editPost') {
          this.upOrEditService.type = 3;
        }
      }
    });
  }

  ngOnInit() {
    this.formUploadService.formUpload = this.fb.group({
      enrollmentJobTitle: ['', Validators.required],
      expirationDate: [null, Validators.required],
      description: new FormControl(),
      users: new FormArray([])
    });
    this.branchsService.onSubmit(2);
    this.jobNameIdService.onSubmit(2);
    this.skillService.onSubmit(2);
    this.options = {
      multiple: true
    };
    this.shiftOptionService.fee = new Array<boolean>();
    this.shiftOptionService.soluongtheogioitinh = new Array<boolean>();
    this.shiftOptionService.fee.push(false);
    this.shiftOptionService.soluongtheogioitinh.push(true);
    this.enrollmentPostService.addNewUser();
    this.users.insert(0, this.fb.group({
      name: null,
      fee: null,
      genderMan: null,
      genderFemale: null,
      genderQuatity: null
    }));
  }
  get enrollmentJobTitle() {
    return this.formUploadService.formUpload.get('enrollmentJobTitle');
  }
  get expirationDate() {
    return this.formUploadService.formUpload.get('expirationDate');
  }
  get users(): FormArray {
    return this.formUploadService.formUpload.get('users') as FormArray;
  }
  onSubmit() {
    this.checkBeforeUp();
    if ( this.formUploadService.formUpload.invalid === false ) {
      this.up();
    } else {
      window.scroll({top: 0, left: 0});
    }
  }
  checkBeforeUp() {
    this.upPost = true;
  }
  up() {
    let index = 0;
    for ( const shift of this.enrollmentPostService.shiftBodies ) {
      if ( shift.startTime >= shift.endTime) {
        this.errorTime = true;
        break;
      }
      if ( shift.mon === false && shift.tue === false && shift.wed === false && shift.thu === false &&
        shift.fri === false && shift.sat === false && shift.sun === false) {
        this.errorDay = true;
        break;
      }
      if ( this.users.value[index].genderQuatity === null && this.users.value[index].genderMan === null
        && this.users.value[index].genderFemale === null) {
        this.errorQuan = true;
        break;
      }
      index++;
    }
    if ( this.errorTime === true) {
      this.openSnackBar('Lỗi thời gian, vui lòng kiểm tra lại', '');
      this.errorTime = false;
    } else if ( this.errorDay === true) {
      this.openSnackBar('Bạn chưa chọn thứ, vui lòng kiểm tra lại', '');
      this.errorDay = false;
    } else if ( this.errorQuan === true) {
      this.openSnackBar('Bạn chưa nhập số lượng tuyển dụng, vui lòng kiểm tra lại', '');
      this.errorQuan = false;
    } else {
      this.enrollmentPostService.enrollmentJobTitle = this.formUploadService.formUpload.value.enrollmentJobTitle;
      this.enrollmentPostService.description = this.formUploadService.formUpload.value.description;
      let indexOfShift = 0;
      for (const shift of this.enrollmentPostService.shiftBodies) {
        if (this.shiftOptionService.fee[indexOfShift] === true) {
          this.enrollmentPostService.shiftBodies[indexOfShift].fee  = 0;
        } else {
          if ( this.users.value[indexOfShift].minSalary === null) {
            this.enrollmentPostService.shiftBodies[indexOfShift].fee  = 0;
          } else {
            this.enrollmentPostService.shiftBodies[indexOfShift].fee  = this.users.value[indexOfShift].fee;
          }
        }
        if ( this.shiftOptionService.soluongtheogioitinh[indexOfShift] === false) {
          this.enrollmentPostService.shiftBodies[indexOfShift].genderRequireds = [];
          this.enrollmentPostService.shiftBodies[indexOfShift].genderRequireds
            .push(new GenderRequired(2, this.users.value[indexOfShift].genderQuatity, 0));
        }
        if ( this.shiftOptionService.soluongtheogioitinh[indexOfShift] === true) {
          this.enrollmentPostService.shiftBodies[indexOfShift].genderRequireds = [];
          if (this.users.value[indexOfShift].genderMan !== null && this.users.value[indexOfShift].genderMan !== '') {
            this.enrollmentPostService.shiftBodies[indexOfShift].genderRequireds
              .push(new GenderRequired(1, this.users.value[indexOfShift].genderMan, 0));
          }
          if (this.users.value[indexOfShift].genderFemale !== null && this.users.value[indexOfShift].genderFemale !== '') {
            this.enrollmentPostService.shiftBodies[indexOfShift].genderRequireds
              .push(new GenderRequired(0, this.users.value[indexOfShift].genderFemale, 0));
          }
        }
        this.enrollmentPostService.shiftBodies[indexOfShift].name = this.users.value[indexOfShift].name;
        indexOfShift++;
      }
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.Authorization
        })
      };
      // console.log('day la job post service');
      // console.log(this.jobPostService);
      if ( this.upOrEditService.type === 2 ) {
        this.http.put(this.postPendingJobUrl + '/' + this.jobIdService.idJob, this.enrollmentPostService, this.httpOptions)
          .subscribe(
            rawObject => this.afterSubmit(rawObject),
            err => console.log(err)
          );
      }
      if (this.upOrEditService.type === 1) {
        console.log(this.enrollmentPostService);
        this.http.post(DEVSERVER + 'api/schools/jobs/pendingPosts' , this.enrollmentPostService, this.httpOptions)
          .subscribe(
            rawObject => this.afterSubmit(rawObject),
            err => this.openSnackBar('Đăng bài không thành công, vui lòng xem lại các thông tin', err)
          );
      }
      if (this.upOrEditService.type === 3) {
        console.log(this.enrollmentPostService);
        this.http.put(this.editPostUrl + this.jobIdService.idJob + '/pendingPosts' , this.enrollmentPostService, this.httpOptions)
          .subscribe(
            rawObject => this.afterSubmit(rawObject),
            err => this.openSnackBar('Đăng bài không thành công, vui lòng xem lại các thông tin', err)
          );
      }
    }
  }
  afterSubmit(rawObject) {
    if ( rawObject.code === 200 ) {
      this.choosePostTypeService.chooseType = 3;
      this.router.navigate(['manage/app-active-and-expired-jobs']);
      this.openSnackBar('Đăng bài thành công', '');
    } else {
      this.openSnackBar('Đăng bài không thành công, vui lòng xem lại các thông tin', '');
    }
    this.upPost = false;
  }
  openSnackBar(mess, err) {
    console.log(err);
    this.enrollmentPostService.remove();
    window.scroll({top: 0, left: 0});
    this.snackBar.open(mess, 'Close', {
      duration: 4500
    });
    this.upPost = false;
  }
  changedJobName(e: any): void {
    if ( e.value !== null ) {
      this.enrollmentPostService.jobNameID = e.value;
    }
  }
  addShift(shiftIndex) {
    this.enrollmentPostService.shiftBodies.push(new Shift('739d0b98-a3cb-46ca-ac92-46219aa3f867', 0, 0, 0, '', false,
      false, false, false, false, false, false, new GenderRequired(0, null, 0)
    ));
    this.shiftOptionService.fee.push(false);
    this.shiftOptionService.soluongtheogioitinh.push(false);
    this.users.insert(this.shiftOptionService.soluongtheogioitinh.length, this.fb.group({
      name: null,
      fee: null,
      genderMan: null,
      genderFemale: null,
      genderQuatity: ''
    }));
  }
  changedMuti(data: {value: string[]}) {
    if (data.value !== null) {
      this.enrollmentPostService.accquiredSkillIDs = data.value;
    }
  }
  openTime(i, type) {
    const dateFormatPipeFilter = new ConvertTimePipe();
    if (type === 0) {
      const amazingTimePicker = this.atp.open({
        time:  dateFormatPipeFilter.transform(this.enrollmentPostService.shiftBodies[i].startTime),
        arrowStyle: {
          background: '#2185ff',
          color: 'white'
        }
      });
      amazingTimePicker.afterClose().subscribe(time => {
        this.convertTime = time.split(':');
        if (type === 0) {
          this.enrollmentPostService.shiftBodies[i].startTime = this.convertTime[0] * 60 + this.convertTime[1] * 1;
        }
      });
    }
    if (type === 1) {
      const amazingTimePicker = this.atp.open({
        time:  dateFormatPipeFilter.transform(this.enrollmentPostService.shiftBodies[i].endTime),
        arrowStyle: {
          background: '#2185ff',
          color: 'white'
        }
      });
      amazingTimePicker.afterClose().subscribe(time => {
        this.convertTime = time.split(':');
        if (type === 1) {
          this.enrollmentPostService.shiftBodies[i].endTime = this.convertTime[0] * 60 + this.convertTime[1] * 1;
        }
      });
    }
  }
  deleteShift(i) {
    this.enrollmentPostService.shiftBodies.splice(i, 1);
    this.shiftOptionService.fee.splice(i, 1);
    this.shiftOptionService.soluongtheogioitinh.splice(i, 1);
    this.users.removeAt(i);
  }
  changedBranch(e: any) {
    this.enrollmentPostService.schoolBranchID = e.value;
  }
  changeExpirationDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.enrollmentPostService.expirationDate = event.value.getTime();
    // console.log(event.value.getTime());
  }
}
