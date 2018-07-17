export class DetailEvent {
  id: string;
  schoolID: string;
  logoUrl: string;
  schoolName: string;
  title: string;
  createdDate: number;
  startTime: number;
  endTime: number;
  address: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  description: string;
  constructor(id: string, schoolID: string, logoUrl: string, schoolName: string, title: string, createdDate: number, startTime: number, endTime: number, address: string, contactEmail: string, contactPhone: string, website: string, description: string) {
    this.id = id;
    this.schoolID = schoolID;
    this.logoUrl = logoUrl;
    this.schoolName = schoolName;
    this.title = title;
    this.createdDate = createdDate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.address = address;
    this.contactEmail = contactEmail;
    this.contactPhone = contactPhone;
    this.website = website;
    this.description = description;
  }
}
