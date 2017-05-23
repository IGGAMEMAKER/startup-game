import random from '../math/random';
import * as GAME_EVENTS from '../../constants/events';
import * as JOB from '../../constants/job';

import flux from '../../flux';

import skillHelper from '../../helpers/team/skills';

import logger from '../../helpers/logger/logger';

const emit = (day) => {
  if (day === 45) {
    let money = Math.ceil(random(2000, 15000));
    flux.messageActions.addGameEvent(GAME_EVENTS.GAME_EVENT_FREE_MONEY, { money });
    return;
  }

  if (day === 100) {
    let points = Math.ceil(random(50, 275));
    flux.messageActions.addGameEvent(GAME_EVENTS.GAME_EVENT_FREE_POINTS, { points });
    return;
  }

  const rnd = Math.floor(random(0, 50));
  // return;
  switch (rnd) {
    // case GAME_EVENTS.GAME_EVENT_FREE_MONEY:
    //   let money = Math.ceil(random(2000, 15000));
    //   flux.messageActions.addGameEvent(rnd, { money });
    //   break;

    // case GAME_EVENTS.GAME_EVENT_FREE_POINTS:
    //   let points = Math.ceil(random(50, 275));
    //   flux.messageActions.addGameEvent(rnd, { points });
    //   break;

    case GAME_EVENTS.GAME_EVENT_HIRE_ENTHUSIAST:
      const teamCount = flux.playerStore.getTeam().length;
      // if (teamCount < 4) {
        const names = ['Jessie', 'John', 'Pedro', 'Martin', 'Rebeca', 'Antonella', 'Lee', 'Manolo', 'James', 'Luka', 'George'];
        const index = Math.floor(random(0, names.length));
        const name = names[index];

        const programming = Math.floor(random(2, 1000));
        const marketing = Math.floor(random(2, 1000));
        const analyst = 0; // Math.floor(random(0, 1000));

        let rating;
        let task;
        if (skillHelper.isMarketer(player)) {
          task = JOB.JOB_TASK_MARKETING_POINTS;
          rating = marketing;
        } else if (skillHelper.isProgrammer(player)) {
          task = JOB.JOB_TASK_PROGRAMMER_POINTS;
          rating = programming;
        } else {
          // by default - go to marketing
          task = JOB.JOB_TASK_MARKETING_POINTS;
          rating = analyst;
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
        // let salary = {
        //   money: Math.floor(random(rating * 0.75, rating * 1.25)),
        //   percent: Math.floor(random(rating * 0.75, rating * 1.25))
        // };


        const player = {
          // player: {
            name,
            skills: {
              programming,
              marketing,
              analyst
            },
            jobMotivation: JOB.JOB_MOTIVATION_IDEA_FAN,
            salary
          // }
        };

        player.task = task;
        flux.playerActions.addEmployee(player);
      // }
      break;
  }
};

export default {
  emit
}
