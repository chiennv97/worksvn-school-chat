export class LanguageSkill {
  id: string;
  language: string;
  level: string;
  certificate: string;
  score: number;
  constructor(id: string, language: string, level: string, certificate: string, score: number) {
    this.id = id;
    this.language = language;
    this.level = level;
    this.certificate = certificate;
    this.score = score;
  }
}
