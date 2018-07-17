import {Injectable} from '@angular/core';

@Injectable()
export class IdRoomChatService {
  id: number;
  candidateCurrentRoom: string;
  constructor() {
    this.id = 0;
  }
}
