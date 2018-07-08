import { Component, OnInit } from '@angular/core';
import {AgmMap} from '@agm/core';
import {HttpHeaders} from '@angular/common/http';
import {TabEnrollmentDetailService} from '../service/tab-enrollment-detail.service';

@Component({
  selector: 'app-tab-enrollment-detail',
  templateUrl: './tab-enrollment-detail.component.html',
  styleUrls: ['./tab-enrollment-detail.component.css']
})
export class TabEnrollmentDetailComponent implements OnInit {
  public agmMap: AgmMap;
  mq = window.matchMedia('(min-width: 600px)');
  widthDisplay = this.mq.matches ? 1000 : 500;
  constructor(
    public tabEnrollmentDetailService: TabEnrollmentDetailService,
  ) {
  }
  ngOnInit() {
  }
  changeSize() {
    this.agmMap.triggerResize();
  }
  onResize(event) {
    this.widthDisplay = event.target.innerWidth;
  }
}
