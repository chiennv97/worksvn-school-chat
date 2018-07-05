import {Pipe, PipeTransform} from '@angular/core';
@Pipe({ name: 'converttime'})

export class ConvertTimePipe implements  PipeTransform {
  hour;
  min;
  result;
  transform(value: number): string {
    this.hour = Math.floor(value / 60);
    this.min = value - this.hour * 60;
    if (this.min < 10) {
      this.result = this.hour.toString() + ':0' + this.min.toString();
    } else {
      this.result = this.hour.toString() + ':' + this.min.toString();
    }
    return this.result;
  }
}
