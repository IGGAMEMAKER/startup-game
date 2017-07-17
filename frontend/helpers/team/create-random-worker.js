import * as JOB from '../../constants/job';
import skillHelper from '../../helpers/team/skills';

import random from '../math/random';

export default {
  create() {
    const names = ['Jessie', 'John', 'Pedro', 'Martin', 'Rebeca', 'Antonella', 'Lee', 'Manolo', 'James', 'Luka', 'George'];
    const index = Math.floor(random(0, names.length));
    const name = names[index];

    const programming = Math.floor(random(101, 1000));
    const marketing = Math.floor(random(102, 1000));
    const analyst = 0; // Math.floor(random(0, 1000));

    let rating;
    let task;

    let obj = { skills: { marketing, programming, analyst }};
    if (skillHelper.isMarketer(obj)) {
      task = JOB.JOB_TASK_MARKETING_POINTS;
      rating = marketing;
    } else if (skillHelper.isProgrammer(obj)) {
      task = JOB.JOB_TASK_PROGRAMMER_POINTS;
      rating = programming;
    } else {
      // by default - go to marketing
      task = JOB.JOB_TASK_MARKETING_POINTS;
      rating = marketing;
    }

    const baseSalary = rating * 6;

    let salary;
    const pricingType = 1; // Math.floor(random(0, 2));
    switch (pricingType) {
      case 0:
        // only percents
        salary = {
          money: 0,
          percent: Math.floor(random(rating / 100, 50) / teamCount)
        };
        break;
      case 1:
        // only money
        salary = {
          money: Math.floor(random(baseSalary * 0.75, baseSalary * 1.25)),
          percent: 0
        };
        break;
    }
    salary.pricingType = pricingType;

    const player = {
      name,
      skills: {
        programming,
        marketing,
        analyst
      },
      jobMotivation: JOB.JOB_MOTIVATION_IDEA_FAN,
      salary
    };

    player.task = task;

    return player;
  }
}
