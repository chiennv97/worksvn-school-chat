import {Pipe, PipeTransform} from '@angular/core';
@Pipe({ name: 'identitycardpipe'})

export class IdentityCardPipe implements  PipeTransform {
  transform(value): string {
    if ( value === null) {
      return '__';
    }  else {
      return value;
    }
  }
}
