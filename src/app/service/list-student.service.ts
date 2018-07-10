import {Injectable} from '@angular/core';
import {Student} from '../class/student';

@Injectable()
export class ListStudentService {
  listStudent = [];
  pageNum = 1;
  totalItem = 0;
  onSubmit(rawObj) {
    // console.log(rawObj);
    this.listStudent = [];
    this.totalItem = rawObj.data.totalItem;
    for ( const obj of rawObj.data.results) {
      this.listStudent.push(new Student(obj.id, obj.firstName, obj.lastName,
        obj.avatarUrl, obj.address, obj.gender, obj.lookingForJob));
    }
  }
}
