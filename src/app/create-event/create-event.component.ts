import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { Event} from '../class/event';
import swal from 'sweetalert2';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepickerInputEvent, MatSnackBar} from '@angular/material';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {EventService} from '../service/event.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DEVSERVER} from '../service/serve';
import {ActivationEnd, Router} from '@angular/router';
import {ConvertTimePipe} from '../pipe/convert-time.pipe';
import {FormUploadService} from '../service/form-upload.service';
import {ConvertTimePipe2} from '../pipe/convert-time2.pipe';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  event;
  // newEvent: Event;
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  accessToken;
  Authorization;
  httpOptions;
  convertTime;
  amazingTimePicker;
  urlCreateEvent = DEVSERVER + 'api/schools/events';
  type;
  id;
  constructor(
    private atp: AmazingTimePickerService,
    private eventService: EventService,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    public formUploadService: FormUploadService
  ) {
    router.events.subscribe((val) => {
      if (val instanceof ActivationEnd) {
        if ( val.snapshot.paramMap.get('type') === 'create') {
          this.type = 1;
        }
        if ( val.snapshot.paramMap.get('type') === 'edit') {
          this.type = 2;
          this.id = val.snapshot.paramMap.get('id');
        }
      }
    });
  }

  ngOnInit() {
    this.formUploadService.newEvent = new Event;
    this.accessToken = localStorage.getItem('accessToken');
    this.Authorization = 'Bearer ' + this.accessToken;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization,
        'Access-Control-Allow-Origin': '*',
      })
    };
    this.formUploadService.formEvent = this.fb.group({
      title: ['', Validators.required],
      startTime: ['', Validators.required],
      startTimeHours: ['', Validators.required],
      endTimeHours: ['', Validators.required],
      endTime: ['', Validators.required],
      address: ['', Validators.required],
      contactEmail: ['', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]],
      contactPhone: ['', [
        Validators.required,
        Validators.pattern(/^((\\+91-?)|0)?[0-9]{10}$/)
      ]],
      website: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  get startTime() {
    return this.formUploadService.formEvent.get('startTime');
  }
  get startTimeHours() {
    return this.formUploadService.formEvent.get('startTimeHours');
  }
  get endTime() {
    return this.formUploadService.formEvent.get('endTime');
  }
  get contactEmail() {
    return this.formUploadService.formEvent.get('contactEmail');
  }
  get contactPhone() {
    return this.formUploadService.formEvent.get('contactPhone');
  }
  get address() {
    return this.formUploadService.formEvent.get('address');
  }
  get title() {
    return this.formUploadService.formEvent.get('title');
  }
  get description() {
    return this.formUploadService.formEvent.get('description');
  }
  get website() {
    return this.formUploadService.formEvent.get('website');
  }
  onSubmit() {
    // console.log(this.newEvent);
    this.formUploadService.newEvent.title = this.formUploadService.formEvent.value.title;
    this.formUploadService.newEvent.address = this.formUploadService.formEvent.value.address;
    this.formUploadService.newEvent.contactEmail = this.formUploadService.formEvent.value.contactEmail;
    this.formUploadService.newEvent.contactPhone = this.formUploadService.formEvent.value.contactPhone;
    this.formUploadService.newEvent.description = this.formUploadService.formEvent.value.description;
    this.formUploadService.newEvent.website = this.formUploadService.formEvent.value.website;
    if ( this.formUploadService.newEvent.startTimeHours !== undefined) {
      this.formUploadService.newEvent.startTime = this.formUploadService.newEvent.startTimeDate +
        this.formUploadService.newEvent.startTimeHours * 60000;
    } else {
      this.formUploadService.newEvent.startTime = this.formUploadService.newEvent.startTimeDate;
    }
    if ( this.formUploadService.newEvent.endTimeHours !== undefined) {
      this.formUploadService.newEvent.endTime = this.formUploadService.newEvent.endTimeDate +
        this.formUploadService.newEvent.endTimeHours * 60000;
    } else {
      this.formUploadService.newEvent.endTime = this.formUploadService.newEvent.endTimeDate;
    }
    console.log(this.formUploadService.newEvent);
    if ( this.type === 1 ) {
      this.http.post(this.urlCreateEvent, this.formUploadService.newEvent, this.httpOptions)
        .subscribe(
          json => this.create(json, 'Tạo sự kiện thành công!'),
          err => console.log(err)
        );
    }
    if ( this.type === 2 ) {
      this.http.put(this.urlCreateEvent + '/' + this.id, this.formUploadService.newEvent, this.httpOptions)
        .subscribe(
          json =>  this.create(json, 'Sửa sự kiện thành công!'),
          err => console.log(err)
        );
    }
  }
  create(json, tit) {
    console.log(json);
    if (json.code === 200) {
      swal({
        type: 'success',
        title: tit,
        showConfirmButton: true,
        timer: 3000
      });
      // setTimeout(() => {
      //     this.router.navigate(['/']);
      //   },
      //   3000);
    }
  }
  changeExpirationDate1(event: MatDatepickerInputEvent<Date>) {
    // this.enrollmentPostService.expirationDate = event.value.getTime();
    this.formUploadService.newEvent.startTimeDate =  event.value.getTime();
    console.log('start', this.formUploadService.newEvent.startTimeDate);
  }
  changeExpirationDate2(event: MatDatepickerInputEvent<Date>) {
    // this.enrollmentPostService.expirationDate = event.value.getTime();
    console.log('end', event.value.getTime());
    this.formUploadService.newEvent.endTimeDate = event.value.getTime();
  }
  openTime(type) {
    const dateFormatPipeFilter = new ConvertTimePipe();
    const dateFormatPipeFilter2 = new ConvertTimePipe2();
    if (type === 0) {
      if (this.formUploadService.newEvent.startTimeHours === undefined) {
        this.amazingTimePicker = this.atp.open({
          time:  dateFormatPipeFilter.transform(0),
          arrowStyle: {
            background: '#2185ff',
            color: 'white'
          }
        });
      } else {
        this.amazingTimePicker = this.atp.open({
          time:  dateFormatPipeFilter.transform(this.formUploadService.newEvent.startTimeHours),
          arrowStyle: {
            background: '#2185ff',
            color: 'white'
          }
        });
      }
      this.amazingTimePicker.afterClose().subscribe(time => {
        this.convertTime = time.split(':');
        if (type === 0) {
          this.formUploadService.newEvent.startTimeHours = this.convertTime[0] * 60 + this.convertTime[1] * 1;
        }
        console.log('start', this.formUploadService.newEvent.startTimeHours);
        this.formUploadService.formEvent.patchValue({
          startTimeHours: dateFormatPipeFilter2.transform(this.formUploadService.newEvent.startTimeHours)
        });
      });
    }
    if (type === 1) {
      if (this.formUploadService.newEvent.endTimeHours === undefined) {
        this.amazingTimePicker = this.atp.open({
          time:  dateFormatPipeFilter.transform(0),
          arrowStyle: {
            background: '#2185ff',
            color: 'white'
          }
        });
      } else {
        this.amazingTimePicker = this.atp.open({
          time:  dateFormatPipeFilter.transform(this.formUploadService.newEvent.endTimeHours),
          arrowStyle: {
            background: '#2185ff',
            color: 'white'
          }
        });
      }
      this.amazingTimePicker.afterClose().subscribe(time => {
        this.convertTime = time.split(':');
        if (type === 1) {
          this.formUploadService.newEvent.endTimeHours = this.convertTime[0] * 60 + this.convertTime[1] * 1;
        }
        console.log('start', this.formUploadService.newEvent.endTimeHours);
        this.formUploadService.formEvent.patchValue({
          endTimeHours: dateFormatPipeFilter2.transform(this.formUploadService.newEvent.endTimeHours)
        });
      });
    }
  }
}

