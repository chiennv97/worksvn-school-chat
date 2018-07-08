import {Pipe, PipeTransform} from '@angular/core';
@Pipe({ name: 'profilepipe'})

export class ProfilePipe implements  PipeTransform {
  transform(value): string {
    if ( value === '-1') {
      return '__';
    } else if ( value === null ) {
      return 'Thông tin được bảo mật';
    } else if ( value === -1) {
      return '__';
    } else if ( value === 0) {
      return 'Nữ';
    } else if ( value === 1) {
      return 'Nam';
    } else {
      return value;
    }
  }
}
