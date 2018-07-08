import {Injectable} from '@angular/core';

@Injectable()
export class ChangeTabService {
  tabChange;
  constructor() {
    this.tabChange = 0;
  }
}
