export class Rating {
  attitudeRating: number;
  attitudeRatingCount: number;
  skillRating: number;
  skillRatingCount: number;
  jobAccomplishmentRating: number;
  jobAccomplishmentRatingCount: number;
  constructor(attitudeRating: number, attitudeRatingCount: number,
              skillRating: number, skillRatingCount: number,
              jobAccomplishmentRating: number, jobAccomplishmentRatingCount: number) {
    this.attitudeRating = attitudeRating;
    this.attitudeRatingCount = attitudeRatingCount;
    this.skillRating = skillRating;
    this.skillRatingCount = skillRatingCount;
    this.jobAccomplishmentRating = jobAccomplishmentRating;
    this.jobAccomplishmentRatingCount = jobAccomplishmentRatingCount;
  }
}
