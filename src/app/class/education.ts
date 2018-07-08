export class Education {
  id: string;
  branchOfLearning: string;
  schoolID: string;
  startedYear: number;
  finishedYear: number;
  majorID: string;
  majorName: string;
  description: string;
  constructor(id: string, branchOfLearning: string,
              schoolID: string, startedYear: number, finishedYear: number, majorID: string, majorName: string, description: string) {
    this.id = id;
    this.branchOfLearning = branchOfLearning;
    this.schoolID = schoolID;
    this.startedYear = startedYear;
    this.finishedYear = finishedYear;
    this.majorID = majorID;
    this.majorName = majorName;
    this.description = description;
  }
}
