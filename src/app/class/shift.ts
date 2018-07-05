import {GenderRequired} from './gender-required';

export class Shift {
  id: string;
  startTime: number;
  endTime: number;
  fee: number;
  name: string;
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thu: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
  shiftIndex: number;
  genderRequireds: Array<GenderRequired>;
  constructor (id, startTime, endTime, fee,
               name, mon, tue, wed, thu,
               fri, sat, sun, genderRequireds, shiftIndex
  ) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
    this.fee = fee;
    this.name = name;
    this.mon = mon;
    this.tue = tue;
    this.wed = wed;
    this.thu = thu;
    this.fri = fri;
    this.sat = sat;
    this.sun = sun;
    this.genderRequireds = genderRequireds;
    this.shiftIndex = shiftIndex;
  }
}
