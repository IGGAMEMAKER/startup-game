export default class Company {
  constructor(companyId, name, ceoId, bonuses, culture) {
    this.id = companyId;
    this.name = name;
    this.CEO = ceoId; // corporation will get its leader bonuses from this person
    this.bonuses = bonuses;
    this.culture = culture;
  }

  getId() {
    return this.id;
  }
}
