export class Student {
  id;
  firstName;
  lastName;
  avatarUrl;
  address;
  gender;
  lookingForJob;
  constructor(id, firstName, lastName, avatarUrl, address, gender, lookingForJob) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.avatarUrl = avatarUrl;
    this.address = address;
    this.gender = gender;
    this.lookingForJob = lookingForJob;
  }
}
