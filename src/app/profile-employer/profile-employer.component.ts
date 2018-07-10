import { Component, OnInit } from '@angular/core';
import {ProfileEmployerService} from '../service/profile-employer.service';

@Component({
  selector: 'app-profile-employer',
  templateUrl: './profile-employer.component.html',
  styleUrls: ['./profile-employer.component.css']
})
export class ProfileEmployerComponent implements OnInit {

  constructor(
    public profileEmployerService: ProfileEmployerService
  ) { }

  ngOnInit() {
  }

}
