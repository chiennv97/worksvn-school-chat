import { Component, OnInit } from '@angular/core';
import {YearService} from '../service/year.service';
import {MajorService} from '../service/major.service';
@Component({
  selector: 'app-manager-student',
  templateUrl: './manager-student.component.html',
  styleUrls: ['./manager-student.component.css']
})
export class ManagerStudentComponent implements OnInit {

  constructor(
    public yearService: YearService,
    public majorService: MajorService
  ) { }

  ngOnInit() {
    this.yearService.onSubmit();
    this.majorService.onSubmit();
  }

}
