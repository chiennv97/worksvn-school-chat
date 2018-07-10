import { Component, OnInit } from '@angular/core';
import {EventService} from '../service/event.service';

@Component({
  selector: 'app-active-and-expried-events',
  templateUrl: './active-and-expried-events.component.html',
  styleUrls: ['./active-and-expried-events.component.css']
})
export class ActiveAndExpriedEventsComponent implements OnInit {
  token;
  listEvent;
  constructor(
    private eventService: EventService,

  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('accessToken');
    this.eventService.getEvent(this.token)
      .subscribe(
        json => this.getevent(json),
        error => this.getevent(error)
      );
  }
  getevent(json) {
    console.log(json);
    if (json.code === 200) {
      this.listEvent = json.data.results;
    }
  }
}
