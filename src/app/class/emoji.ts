export class Emoji {
  groupID: string;
  icon: string[];
  constructor(groupID: string, icon: string[] ) {
    this.groupID = groupID;
    this.icon = icon;
  }
}
