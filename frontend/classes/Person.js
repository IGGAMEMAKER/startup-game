import * as JOB from '../constants/job';

export default class Person {
  constructor({
    name,
    marketing, programming, analyst,
    task,
    jobMotivation,
    salary
  }) {
    this.name = name;
    this.skills = {
      programming,
      marketing,
      analyst
    };

    this.jobMotivation = jobMotivation || JOB.JOB_MOTIVATION_IDEA_FAN;
    this.salary = salary || {
      money: 500,
      percent: 0,
      pricingType: 1
    };

    this.task = task;
  }
}
