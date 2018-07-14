import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {EventService} from '../service/event.service';
import {HttpHeaders, HttpParams} from '@angular/common/http';
import {DEVSERVER} from '../service/serve';
import swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material';

@Component({
  selector: 'app-active-and-expried-events',
  templateUrl: './active-and-expried-events.component.html',
  styleUrls: ['./active-and-expried-events.component.css']
})
export class ActiveAndExpriedEventsComponent implements OnInit {
  token;
  formEvent: FormGroup;
  listEvent;
  urlDelete =  DEVSERVER + 'api/schools/events/';
  constructor(
    private eventService: EventService,
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,

  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('accessToken');
    this.eventService.getEvent(this.token)
      .subscribe(
        json => this.getevent(json),
        error => this.getevent(error)
      );
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
      // website: ['', Validators.required],
      // description: ['', Validators.required],
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
  // get description() {
  //   return this.formEvent.get('description');
  // }
  // get website() {
  //   return this.formEvent.get('website');
  // }
  changeExpirationDate1(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log( event.value.getTime());
  }
  changeExpirationDate2(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log( event.value.getTime());
  }
    getevent(json) {
    console.log(json);
    if (json.code === 200) {
      this.listEvent = json.data.results;
      console.log(this.listEvent);
    }
  }
  deleteEvent(id, i) {
      swal({
        title: 'Bạn có chắc chắn muốn xóa?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa!',
        cancelButtonText: 'Hủy bỏ'
      }).then((result) => {
        if (result.value) {
          this.urlDelete = this.urlDelete + id;
          this.eventService.deleteEvent(this.token, this.urlDelete, id)
            .subscribe(
              json => this.delete(json, i),
              err => this.delete(err.error, i)
            );
          this.urlDelete = DEVSERVER + 'api/schools/events/';
        }
      });
  }
  delete(json, i) {
    console.log(json);
    if (json.code === 200) {
      // this.listEvent = json.data;
      swal({
        title: 'Đã xóa!',
        text: 'Sự kiện đã được xóa.',
        type: 'success',
        showConfirmButton: false,
        timer: 3000
      });
      this.listEvent.splice(i, 1);
    }
    if (json.code === 401) {
      swal({
        type: 'error',
        title: 'Xóa Sự kiện thất bại!',
        text: 'Phiên giao dịch đã hết hạn, mời bạn đăng nhập lại!',
      });
    }
  }
  onSubmit() {}
  editEvent(i, id, title: string, address, startTime, endTime, contactEmail, contactPhone, description ) {
    console.log('fffff');
    const self = this;
    self.ref.detectChanges();
    self.formEvent.patchValue({title: title});
    self.formEvent.patchValue({address: address});
    self.formEvent.patchValue({startTime: startTime});
    self.formEvent.patchValue({endTime: endTime});
    self.formEvent.patchValue({contactEmail: contactEmail});
    self.formEvent.patchValue({contactPhone: contactPhone});
    // self.formEvent.patchValue({description: description});

  }
}
