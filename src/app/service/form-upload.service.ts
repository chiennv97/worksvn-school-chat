import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import { Event} from '../class/event';
@Injectable()
export class FormUploadService {
  formUpload: FormGroup;
  formEvent: FormGroup;
  newEvent: Event;
}
