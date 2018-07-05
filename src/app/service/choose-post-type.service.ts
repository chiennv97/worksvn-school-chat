import { Injectable } from '@angular/core';

@Injectable()
export class ChoosePostTypeService {
  chooseType = 1;
  setChooseType(num) {
    this.chooseType = num;
  }
  constructor() { }

}
