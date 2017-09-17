import random from '../math/random';
import * as GAME_EVENTS from '../../constants/events';

import mvpCreator from '../../components/Game/Product/InitialPanel/mvp-creator';

// import {
//   messageActions, productStore
// } from '../../flux';
import messageActions from '../../actions/message-actions';
import productActions from '../../actions/product-actions';
import productStore from '../../stores/product-store';

import logger from '../../helpers/logger/logger';

import workerGenerator from '../team/create-random-worker';

import * as NOTIFICATION from '../../constants/notifications';

const emit = (day) => {
  if (day === 45) {
    let money = Math.ceil(random(2000, 15000));

    messageActions.addGameEvent(GAME_EVENTS.GAME_EVENT_FREE_MONEY, { money }, true);
    return;
  }

  if (day === 100) {
    let points = Math.ceil(random(50, 275));
    messageActions.addGameEvent(GAME_EVENTS.GAME_EVENT_FREE_POINTS, { points });
    return;
  }

  const rnd = Math.floor(random(0, 50));
  switch (rnd) {
    // case GAME_EVENTS.GAME_EVENT_FREE_MONEY:
    //   let money = Math.ceil(random(2000, 15000));
    //   messageActions.addGameEvent(rnd, { money });
    //   break;

    // case GAME_EVENTS.GAME_EVENT_FREE_POINTS:
    //   let points = Math.ceil(random(50, 275));
    //   messageActions.addGameEvent(rnd, { points });
    //   break;
    case GAME_EVENTS.GAME_EVENT_COMPETITOR_CREATE:
      if (day % 2 === 0 && productStore.getProducts().length < 16 && day > 100) {
        // const p = mvpCreator.createCompetitorCompany(productStore.getIdea(0));
        //
        // messageActions.addNotification(NOTIFICATION.NOTIFICATION_COMPETITORS_ADD, p);
      }
      break;
    case GAME_EVENTS.GAME_EVENT_HIRE_ENTHUSIAST:
      const teamCount = productStore.getTeam().length;
      // if (teamCount < 4) {
        let player = workerGenerator.create();
        productActions.addEmployee(player);
      // }
      break;
  }
};

export default {
  emit
}
