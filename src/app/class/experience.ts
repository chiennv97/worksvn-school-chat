export class Experience {
  id: string;
  jobName: string;
  companyName: string;
  startedDate: number;
  finishedDate: number;
  description: string;
  constructor(id: string, jobName: string, companyName: string, startedDate: number, finishedDate: number, description: string) {
    this.id = id;
    this.jobName = jobName;
    this.companyName = companyName;
    this.startedDate = startedDate;
    this.finishedDate = finishedDate;
    this.description = description;
  }
}
