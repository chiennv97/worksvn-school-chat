import { Component, OnInit } from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';
import { Event} from '../class/event';
import {DEVSERVER} from '../service/serve';
import {EventService} from '../service/event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  id;
  token;
  urlEventDetail = DEVSERVER + '/api/schools/schoolCooperations/activeEvents/';

  constructor(
    private router: Router,
    private eventService: EventService,

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
        error => this.geteventDetail(error)
      );
  }
  geteventDetail(json) {
    console.log(json);
  }
}
