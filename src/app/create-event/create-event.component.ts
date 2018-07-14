import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { Event} from '../class/event';
import swal from 'sweetalert2';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepickerInputEvent, MatSnackBar} from '@angular/material';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {EventService} from '../service/event.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DEVSERVER} from '../service/serve';
import {Router} from '@angular/router';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  event;
  newEvent: Event;
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  accessToken;
  Authorization;
  httpOptions;
  urlCreateEvent = DEVSERVER + 'api/schools/events';
  formEvent: FormGroup;
  constructor(
    private atp: AmazingTimePickerService,
    private eventService: EventService,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,

  ) { }

  ngOnInit() {
    this.newEvent = new Event;
    this.accessToken = localStorage.getItem('accessToken');
    this.Authorization = 'Bearer ' + this.accessToken;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization,
        'Access-Control-Allow-Origin': '*',
      })
    };
    this.formEvent = this.fb.group({
      title: ['', Validators.required],
      startTime: ['', Validators.required],
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
    return this.formEvent.get('startTime');
  }
  get endTime() {
    return this.formEvent.get('endTime');
  }
  get contactEmail() {
    return this.formEvent.get('contactEmail');
  }
  get contactPhone() {
    return this.formEvent.get('contactPhone');
  }
  get address() {
    return this.formEvent.get('address');
  }
  get title() {
    return this.formEvent.get('title');
  }
  get description() {
    return this.formEvent.get('description');
  }
  get website() {
    return this.formEvent.get('website');
  }
  onSubmit() {
    this.newEvent.title = this.formEvent.value.title;
    this.newEvent.address = this.formEvent.value.address;
    this.newEvent.contactEmail = this.formEvent.value.contactEmail;
    this.newEvent.contactPhone = this.formEvent.value.contactPhone;
    this.newEvent.description = this.formEvent.value.description;
    this.newEvent.website = this.formEvent.value.website;
    console.log(this.newEvent);
    this.http.post(this.urlCreateEvent, this.newEvent, this.httpOptions)
      .subscribe(
        json => this.create(json),
        err => this.create(err.error)
      );
  }
  create(json) {
    console.log(json);
    if (json.code === 200) {
      swal({
        type: 'success',
        title: 'Tạo sự kiện thành công!',
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
    console.log('start', event.value.getTime());
    this.newEvent.startTime = event.value.getTime();
  }
  changeExpirationDate2(event: MatDatepickerInputEvent<Date>) {
    // this.enrollmentPostService.expirationDate = event.value.getTime();
    console.log('end', event.value.getTime());
    this.newEvent.endTime = event.value.getTime();
  }
}

