export class DataEmojiNotification {
  type: string;
  roomID: string;
  ownerName: string;
  ownerAvatarUrl: string;
  messageType: string;
  emojiGroup: string;
  emojiID: string;
  constructor(type: string, roomID: string, ownerName: string, ownerAvatarUrl: string,
              messageType: string, emojiGroup: string, emojiID: string) {
    this.type = type;
    this.roomID = roomID;
    this.ownerName = ownerName;
    this.ownerAvatarUrl = ownerAvatarUrl;
    this.messageType = messageType;
    this.emojiGroup = emojiGroup;
    this.emojiID = emojiID;
  }
}
