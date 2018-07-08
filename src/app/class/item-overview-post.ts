export class ItemOverviewPost {
  id: string;
  jobName: string;
  name: string;
  createDate: string;
  expirationDate: string;
  numberApplyJob: string;
  suitableCount: number;
  schoolBranchName: string;
  timeLeft: string;
  hidden: boolean;
  address: string;
  enableNotification: boolean;
  constructor(id: string, jobName: string, name: string, createDate: string, expirationDate: string, numberApplyJob: string, suitableCount: number, schoolBranchName: string, timeLeft: string, hidden: boolean, address: string, enableNotification: boolean) {
    this.id = id;
    this.jobName = jobName;
    this.name = name;
    this.createDate = createDate;
    this.expirationDate = expirationDate;
    this.numberApplyJob = numberApplyJob;
    this.suitableCount = suitableCount;
    this.schoolBranchName = schoolBranchName;
    this.timeLeft = timeLeft;
    this.hidden = hidden;
    this.address = address;
    this.enableNotification = enableNotification;
  }
}
