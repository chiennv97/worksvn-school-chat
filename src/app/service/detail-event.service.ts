import {Injectable} from '@angular/core';
import {DetailEvent} from '../class/detail-event';

@Injectable()
export class DetailEventService {
  detailEvent: DetailEvent;
  save(obj) {
    this.detailEvent = new DetailEvent(obj.id, obj.schoolID, obj.logoUrl, obj.schoolName, obj.title,
      obj.createdDate, obj.startTime, obj.endTime, obj.address, obj.contactEmail, obj.contactPhone,
      obj.website, obj.description);
    console.log(this.detailEvent);
  }
}
