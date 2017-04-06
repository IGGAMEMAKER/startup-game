import random from '../math/random';
import * as GAME_EVENTS from '../../constants/events';
import * as JOB from '../../constants/job';
import messageActions from '../../actions/message-actions';

import scheduleStore from '../../stores/schedule-store';
import playerStore from '../../stores/player-store';

import logger from '../../helpers/logger/logger';

const emit = () => {
  const rnd = Math.floor(random(0, 30));

  switch (rnd) {
    case GAME_EVENTS.GAME_EVENT_FREE_MONEY:
      let money = Math.ceil(random(10000, 35000));
      messageActions.addGameEvent(rnd, { money });
      break;
    case GAME_EVENTS.GAME_EVENT_FREE_POINTS:
      let points = Math.ceil(random(100, 275));
      messageActions.addGameEvent(rnd, { points });
      break;
    case GAME_EVENTS.GAME_EVENT_HIRE_ENTHUSIAST:
      if (playerStore.getTeam().length < 4) {
        const names = ['Jessie', 'John', 'Pedro', 'Martin', 'Rebeca', 'Antonella'];
        const index = Math.floor(random(0, names.length));
        const name = names[index];

        const programming = Math.floor(random(0, 1000));
        const marketing = Math.floor(random(0, 1000));
        const analyst = Math.floor(random(0, 1000));

        messageActions.addGameEvent(rnd, {
          player: {
            name,
            skills: {
              programming,
              marketing,
              analyst
            },
            task: JOB.JOB_TASK_MARKETING_POINTS,
            jobMotivation: JOB.JOB_MOTIVATION_IDEA_FAN,
            salary: {}
          }
        });
      }
      break;
  }
};

export default {
  emit
}
