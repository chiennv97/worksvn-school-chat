import {Injectable} from '@angular/core';
import {Student} from '../class/student';
import {Employer} from '../class/employer';

@Injectable()
export class ManageCooperationService {
  listEmployer = [];
  pageNum = 1;
  totalItem = 0;
  listEmployerPen = [];
  save(rawObj, arraySave) {
    this.listEmployer = [];
    this.totalItem = rawObj.data.totalItem;
    for ( const obj of rawObj.data.results) {
      this.listEmployer.push(new Employer(obj.employerPreview.id, obj.employerPreview.logoUrl, obj.employerPreview.employerName,
        obj.employerPreview.address, obj.state, obj.createdDate));
    }
  }
  onSubmit(rawObj, type) {
    console.log(rawObj);
    if ( type ===  1) {
      this.save(rawObj, this.listEmployer);
    }
    if ( type === 2) {
      this.save(rawObj, this.listEmployer);
    }
  }
}
