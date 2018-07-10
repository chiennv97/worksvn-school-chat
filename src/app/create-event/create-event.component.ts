import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { Event} from '../class/event';
import {User} from '../class/user';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepickerInputEvent, MatSnackBar} from '@angular/material';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {EventService} from '../service/event.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DEVSERVER} from '../service/serve';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  event;
  newEvent = new Event('', 1531242000000, 0, '', '', '', '', '' );
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  accessToken;
  Authorization;
  httpOptions;
  isValidFormSubmitted = false;
  validateEmail = true;
  user = new User('', '', '', '');
  urlCreateEvent = DEVSERVER + 'api/schools/events';

  constructor(
    private atp: AmazingTimePickerService,
    private eventService: EventService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem('accessToken');
    this.Authorization = 'Bearer ' + this.accessToken;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization,
        'Access-Control-Allow-Origin': '*',
      })
    };
  }
  onSubmit() {
    console.log(this.newEvent);
    this.event = this.newEvent;
    // this.eventService.createNewEvent(this.accessToken, this.event)
    this.http.post(this.urlCreateEvent, this.newEvent, this.httpOptions)
      .subscribe(
        user => this.create(user),
        err => this.create(err.error)
      );
  }
  create(user) {
    console.log(user);
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

