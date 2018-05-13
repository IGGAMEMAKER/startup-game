import random from '../../../shared/utils/random';

export default {
  create() {
    const names = ['Jessie', 'John', 'Pedro', 'Martin', 'Rebeca', 'Antonella', 'Lee', 'Manolo', 'James', 'Luka', 'George'];
    const index = Math.floor(random(0, names.length));
    const name = names[index];

    const programming = Math.floor(random(101, 1000));
    const marketing = Math.floor(random(102, 1000));
    const analyst = 0; // Math.floor(random(0, 1000));

    let rating = 5;

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
      jobMotivation: null,
      salary
    };

    return player;
  }
}
