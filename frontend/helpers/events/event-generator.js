import random from '../math/random';
import * as GAME_EVENTS from '../../constants/events';
import * as JOB from '../../constants/job';

import flux from '../../flux';

import mvpCreator from '../../components/Game/Product/InitialPanel/mvp-creator';

import messager from '../messages/messager';

import logger from '../../helpers/logger/logger';

import workerGenerator from '../team/create-random-worker';

const emit = (day) => {
  if (day === 45) {
    let money = Math.ceil(random(2000, 15000));

    messager.addModalMessage(GAME_EVENTS.GAME_EVENT_FREE_MONEY, { money });
    return;
  }

  if (day === 100) {
    let points = Math.ceil(random(50, 275));
    messager.addModalMessage(GAME_EVENTS.GAME_EVENT_FREE_POINTS, { points });
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
    case GAME_EVENTS.GAME_EVENT_COMPETITOR_CREATE:
      if (day % 2 === 0) {
        const p = mvpCreator.createCompetitorCompany(flux.productStore.getIdea(0));

        if (day > 100 && day < 250) {
          messager.addPlainMessage(GAME_EVENTS.GAME_EVENT_COMPETITOR_CREATE, { p });
        } else if (day >= 250) {
          messager.addPlainMessage(GAME_EVENTS.GAME_EVENT_COMPETITOR_CREATE, { p });
        }
      }
      break;
    case GAME_EVENTS.GAME_EVENT_HIRE_ENTHUSIAST:
      const teamCount = flux.productStore.getTeam().length;
      // if (teamCount < 4) {
        let player = workerGenerator.create();
        flux.productActions.addEmployee(player);
      // }
      break;
  }
};

export default {
  emit
}
