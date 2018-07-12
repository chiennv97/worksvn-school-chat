export class DataNotification {
  type: string;
  roomID: string;
  ownerName: string;
  ownerAvatarUrl: string;
  messageType: string;
  message: string;
  constructor(type: string, roomID: string, ownerName: string, ownerAvatarUrl: string, messageType: string, message: string) {
    this.type = type;
    this.roomID = roomID;
    this.ownerName = ownerName;
    this.ownerAvatarUrl = ownerAvatarUrl;
    this.messageType = messageType;
    this.message = message;
  }
}
