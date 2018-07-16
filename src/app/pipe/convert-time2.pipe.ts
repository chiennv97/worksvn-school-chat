import {Pipe, PipeTransform} from '@angular/core';
@Pipe({ name: 'converttime2'})

export class ConvertTimePipe2 implements  PipeTransform {
  hour;
  min;
  result;
  transform(value): string {
    if (value === undefined || value === '') {
      return '00:00 AM';
    }
    this.hour = Math.floor(value / 60);
    this.min = value - this.hour * 60;
    if (this.min < 10) {
      this.result = this.hour.toString() + ':0' + this.min.toString();
    } else {
      this.result = this.hour.toString() + ':' + this.min.toString();
    }
    if (this.hour < 12) {
      this.result = this.result + ' AM';
    } else {
      this.result = this.result + ' PM';
    }
    console.log(this.result);
    return this.result;
  }
}
