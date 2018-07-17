import {Injectable} from '@angular/core';
import {Employer} from '../class/employer';

@Injectable()
export class ListEmployerEventService {
  listEmployer = [];
  totalItem = 0;
  save(rawObj) {
    this.listEmployer = [];
    this.totalItem = rawObj.data.totalItem;
    for ( const obj of rawObj.data.results) {
      this.listEmployer.push(new Employer(obj.employerPreview.id, obj.employerPreview.logoUrl, obj.employerPreview.employerName,
        obj.employerPreview.address, obj.state, obj.createdDate));
    }
  }
}
