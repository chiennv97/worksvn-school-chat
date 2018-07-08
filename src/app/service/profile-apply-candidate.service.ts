import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DEVSERVER} from './serve';
import {JobIdService} from './job-id.service';
import {CandidateIdService} from './candidate-id.service';
import {Rating} from '../class/rating';
import {Skill} from '../class/skill';
import {LanguageSkill} from '../class/language-skill';
import {Experience} from '../class/experience';
import {Education} from '../class/education';

@Injectable()
export class ProfileApplyCandidateService {
  Authorization;
  httpOptions;
  typeOfProfile;
  profileApplyCandidateUrl = DEVSERVER + 'api/schools/enrollmentJobs/';
  temptUrl;
  firstName;
  lastName;
  gender;
  birthday;
  avatarUrl;
  coverUrl;
  address;
  phone;
  email;
  rating: Rating;
  description;
  region;
  identityCard;
  identityCardFrontImageUrl;
  identityCardBackImageUrl;
  skills: Array<Skill>;
  languageSkills: Array<LanguageSkill>;
  experiences: Array<Experience>;
  educations: Array<Education>;
  constructor(
    private jobIdService: JobIdService,
    private candidateIdService: CandidateIdService,
    private http: HttpClient,
  ) {
    this.Authorization = 'Bearer' + localStorage.getItem('accessToken');
  }
  onSubmit(type, id) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization
      })
    };
    if ( type === 1 ) {
      this.typeOfProfile = 1;
      this.temptUrl = this.profileApplyCandidateUrl + this.jobIdService.idJob +
        '/registeredCandidates/' + this.candidateIdService.idCandidate + '/profile';
    }
    if ( type === 2 ) {
      this.typeOfProfile = 2;
      this.temptUrl = DEVSERVER +
        'api/schools/students/' + id;
    }
    this.http.get(this.temptUrl ,
      this.httpOptions)
      .subscribe(
        rawObject => this.save(rawObject),
        err => console.log(err)
      );
  }
  save(obj) {
    console.log(obj);
    this.firstName = obj.data.firstName;
    this.lastName = obj.data.lastName;
    this.gender = obj.data.gender;
    this.birthday = obj.data.birthday;
    this.avatarUrl = obj.data.avatarUrl;
    this.coverUrl = obj.data.coverUrl;
    this.address = obj.data.address;
    this.phone = obj.data.phone;
    this.coverUrl = obj.data.coverUrl;
    this.email = obj.data.email;
    this.identityCardFrontImageUrl = obj.data.identityCardFrontImageUrl;
    this.identityCardBackImageUrl = obj.data.identityCardBackImageUrl;
    this.description = obj.data.description;
    this.rating = new Rating(obj.data.rating.attitudeRating,
      obj.data.rating.attitudeRatingCount,
      obj.data.rating.skillRating,
      obj.data.rating.skillRatingCount,
      obj.data.rating.jobAccomplishmentRating,
      obj.data.rating.jobAccomplishmentRatingCount,
    );
    this.region = obj.data.region.name;
    this.identityCard = obj.data.identityCard;
    this.skills = [];
    this.languageSkills = [];
    this.experiences = [];
    this.educations = [];
    for (const skill of obj.data.skills) {
      this.skills.push(new Skill(skill.id, skill.name));
    }
    for (const languageSkill of obj.data.languageSkills){
      this.languageSkills.push(new LanguageSkill(languageSkill.id,
        languageSkill.language.name,
        languageSkill.level,
        languageSkill.certificate,
        languageSkill.score
      ));
    }
    for (const experience of obj.data.experiences) {
      this.experiences.push(new Experience(experience.id,
        experience.jobName,
        experience.companyName,
        experience.startedDate,
        experience.finishedDate,
        experience.description
      ));
    }
    for (const education of obj.data.educations) {
      this.educations.push(new Education(education.id, education.branchOfLearning, education.schoolID,
        education.startedYear, education.finishedYear, education.major.id, education.major.name, education.description
      ));
    }
  }
}
