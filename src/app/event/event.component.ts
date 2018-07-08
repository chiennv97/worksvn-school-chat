import { Component, OnInit } from '@angular/core';
import { DEVSERVER } from '../service/serve';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import swal from 'sweetalert2';
import { EventService } from '../service/event.service';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  urlListEvent = DEVSERVER + 'api/schools/activeEvents';
  constructor(
    private http: HttpClient,
    private eventService: EventService,
  ) { }

  ngOnInit() {

  }

}
