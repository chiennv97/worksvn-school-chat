import {Injectable} from '@angular/core';

@Injectable()
export class ProfileEmployerService {
  id;
  employerName;
  address;
  lat;
  lon;
  email;
  phone;
  logoUrl;
  coverUrl;
  description;
  isProfileVerified;
  identityCardBackImageUrl;
  identityCardFrontImageUrl;
  workingEnvironmentRating;
  workingEnvironmentRatingCount;
  salaryRating;
  salaryLevelRatingCount;
  onSubmit(rawObj) {
    this.id = rawObj.data.id;
    this.employerName = rawObj.data.employerName;
    this.address = rawObj.data.address;
    this.lat = rawObj.data.lat;
    this.lon = rawObj.data.lon;
    this.email = rawObj.data.email;
    this.phone = rawObj.data.phone;
    this.logoUrl = rawObj.data.logoUrl;
    this.coverUrl = rawObj.data.coverUrl;
    this.description = rawObj.data.description;
    this.isProfileVerified = rawObj.data.isProfileVerified;
    this.identityCardBackImageUrl = rawObj.data.identityCardBackImageUrl;
    this.identityCardFrontImageUrl = rawObj.data.identityCardFrontImageUrl;
    this.workingEnvironmentRating = rawObj.data.rating.workingEnvironmentRating;
    this.workingEnvironmentRatingCount = rawObj.data.rating.workingEnvironmentRatingCount;
    this.salaryRating = rawObj.data.rating.salaryRating;
    this.salaryLevelRatingCount = rawObj.data.rating.salaryLevelRatingCount;

  }
}
