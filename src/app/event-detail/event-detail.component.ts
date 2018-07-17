import { Component, OnInit } from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';
import { Event} from '../class/event';
import {DEVSERVER} from '../service/serve';
import {EventService} from '../service/event.service';
import {DetailEventService} from '../service/detail-event.service';
import {FormUploadService} from '../service/form-upload.service';
import swal from 'sweetalert2';
import {ListEmployerEventService} from '../service/list-employer-event.service';
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  id;
  token;
  urlEventDetail = DEVSERVER + 'api/schools/schoolCooperations/activeEvents/';
  urlDelete;
  constructor(
    private router: Router,
    private eventService: EventService,
    public detailEventService: DetailEventService,
    public formUploadService: FormUploadService,
    public listEmployerEventService: ListEmployerEventService

  ) {
    router.events.subscribe((val) => {
      if (val instanceof ActivationEnd) {
        if ( val.snapshot.paramMap.get('id') !== null) {
          this.id = val.snapshot.paramMap.get('id');
        }
      }
    });
  }

  ngOnInit() {
    this.token = localStorage.getItem('accessToken');
    this.urlEventDetail =  this.urlEventDetail + this.id;
    this.eventService.getEventDetail(this.token, this.urlEventDetail, this.id)
      .subscribe(
        json => this.geteventDetail(json),
        error => console.log(error)
      );
    this.eventService.getListEmployerEvent(this.id).subscribe(
      json => this.listEmployerEventService.save(json),
      error => console.log(error)
    );
  }
  geteventDetail(json) {
    this.detailEventService.save(json.data);
  }
  edit() {
    this.router.navigate(['manage/events/post/edit/' + this.id]);
    this.token = localStorage.getItem('accessToken');
    this.urlEventDetail =  DEVSERVER + 'api/schools/schoolCooperations/activeEvents/' + this.id;
    this.eventService.getEventDetail(this.token, this.urlEventDetail, this.id)
      .subscribe(
        json => this.afterGetEdit(json),
        error => console.log(error)
      );
  }
  afterGetEdit(json) {
    const startTimeDate = new Date(json.data.startTime);
    const endTimeDate = new Date(json.data.endTime);
    this.formUploadService.formEvent.patchValue({
        title: json.data.title,
        startTime: startTimeDate,
        startTimeHours: startTimeDate.toLocaleTimeString(),
        endTimeHours: endTimeDate.toLocaleTimeString(),
        endTime: endTimeDate,
        address: json.data.address,
        contactEmail: json.data.contactEmail,
        contactPhone: json.data.contactPhone,
        website: json.data.website,
        description: json.data.description
      }
    );
    this.formUploadService.newEvent.startTimeHours = startTimeDate.getMinutes() + startTimeDate.getHours() * 60;
    this.formUploadService.newEvent.endTimeHours = endTimeDate.getMinutes() + endTimeDate.getHours() * 60;
    this.formUploadService.newEvent.startTimeDate = json.data.startTime - this.formUploadService.newEvent.startTimeHours * 60000;
    this.formUploadService.newEvent.endTimeDate = json.data.endTime - this.formUploadService.newEvent.endTimeHours * 60000;
  }
  deleteEvent() {
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
        this.urlDelete = DEVSERVER + 'api/schools/events/' + this.id;
        this.eventService.deleteEvent(this.token, this.urlDelete, this.id)
          .subscribe(
            json => this.delete(json),
            err => this.delete(err.error)
          );
      }
    });
  }
  delete(json) {
    if (json.code === 200) {
      // this.listEvent = json.data;
      swal({
        title: 'Đã xóa!',
        text: 'Sự kiện đã được xóa.',
        type: 'success',
        showConfirmButton: false,
        timer: 3000
      });
      // this.listEvent.splice(i, 1);
      this.router.navigate(['manage/events/active']);
    }
    if (json.code !== 200) {
      swal({
        type: 'error',
        title: 'Xóa Sự kiện thất bại!',
        text: 'Phiên giao dịch đã hết hạn, mời bạn đăng nhập lại!',
      });
    }
  }
  openProfileEmployer(i) {
  }
}
