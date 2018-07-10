export class Employer {
  id;
  logoUrl;
  employerName;
  address;
  state;
  createdDate;
  constructor(id, logoUrl, employerName, address, state, createdDate) {
    this.id = id;
    this.logoUrl = logoUrl;
    this.employerName = employerName;
    this.address = address;
    this.state = state;
    this.createdDate = createdDate;
  }
}
