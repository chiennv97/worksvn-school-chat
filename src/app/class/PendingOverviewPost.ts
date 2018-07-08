export class PendingOverviewPost {
  id: string;
  jobName: string;
  schoolBranchName: string;
  address: string;
  jobTitle: string;
  createdDate: number;
  state: string;
  repliedDate: number;
  message: number;
  enableNotification: boolean;
  constructor(id: string, jobName: string, schoolBranchName: string, address: string, jobTitle: string, createdDate: number, state: string, repliedDate: number, message: number, enableNotification: boolean) {
    this.id = id;
    this.jobName = jobName;
    this.schoolBranchName = schoolBranchName;
    this.address = address;
    this.jobTitle = jobTitle;
    this.createdDate = createdDate;
    this.state = state;
    this.repliedDate = repliedDate;
    this.message = message;
    this.enableNotification = enableNotification;
  }
}
